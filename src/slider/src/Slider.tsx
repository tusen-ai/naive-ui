import {
  h,
  ref,
  toRef,
  computed,
  watch,
  nextTick,
  defineComponent,
  Transition,
  PropType,
  onBeforeUnmount,
  CSSProperties,
  onBeforeUpdate,
  onBeforeMount
} from 'vue'
import {
  VBinder,
  VTarget,
  VFollower,
  FollowerPlacement,
  FollowerInst
} from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { on, off } from 'evtd'
import { useTheme, useFormItem, useConfig, ThemeProps } from '../../_mixins'
import {
  warn,
  call,
  useAdjustedTo,
  MaybeArray,
  ExtractPublicPropTypes
} from '../../_utils'
import { sliderLight, SliderTheme } from '../styles'
import { OnUpdateValueImpl } from './interface'
import { isTouchEvent } from './utils'
import style from './styles/index.cssr'

export interface ClosestMark {
  value: number
  distance: number
  index: number
}

const MouseButtonLeft = 0

const sliderProps = {
  ...(useTheme.props as ThemeProps<SliderTheme>),
  to: useAdjustedTo.propTo,
  defaultValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  marks: Object as PropType<Record<string, string>>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  formatTooltip: Function as PropType<(value: number) => string | number>,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  range: Boolean,
  value: [Number, Array] as PropType<number | number[]>,
  placement: String as PropType<FollowerPlacement>,
  showTooltip: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  tooltip: {
    type: Boolean,
    default: true
  },
  vertical: Boolean,
  reverse: Boolean,
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<<T extends number & number[]>(value: T) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<<T extends number & number[]>(value: T) => void>
  >,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<
    MaybeArray<<T extends number & number[]>(value: T) => void>
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'slider',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>

export default defineComponent({
  name: 'Slider',
  props: sliderProps,
  setup (props) {
    const { mergedClsPrefixRef, namespaceRef } = useConfig(props)
    const themeRef = useTheme(
      'Slider',
      'Slider',
      style,
      sliderLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedDisabledRef } = formItem
    const handleRailRef = ref<HTMLElement | null>(null)
    const precisionRef = computed(() => {
      const { step } = props
      if (!step) return 0
      const stepString = step.toString()
      let precision = 0
      if (stepString.includes('.')) {
        precision = stepString.length - stepString.indexOf('.') - 1
      }
      return precision
    })
    const handleRefs = ref<HTMLElement[]>([])
    const followerRefs = ref<FollowerInst[]>([])

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const mergedValuesRef = computed(() => {
      return ((props.range
        ? mergedValueRef.value
        : [mergedValueRef.value]) as number[]).map(clampValue)
    })

    const mergedPlacementRef = computed(() => {
      return props.placement === undefined
        ? props.vertical
          ? 'right'
          : 'top'
        : props.placement
    })

    const propMarkValues = computed(() => {
      const { marks } = props
      return marks ? Object.keys(marks).map(parseFloat) : null
    })

    const activeIndexRef = ref(-1)
    const previousIndexRef = ref(-1)
    const hoverIndexRef = ref(-1)
    const draggingRef = ref(false)

    const styleDirectionRef = computed(() => {
      const { vertical, reverse } = props
      const left = reverse ? 'right' : 'left'
      const bottom = reverse ? 'top' : 'bottom'
      return vertical ? bottom : left
    })

    const fillStyleRef = computed(() => {
      const values = mergedValuesRef.value
      const start = props.range ? Math.min.apply(null, values) : props.min
      const end = props.range ? Math.max.apply(null, values) : values[0]
      const { value: styleDirection } = styleDirectionRef
      return props.vertical
        ? {
            [styleDirection]: `${valueToPercentage(start)}%`,
            height: `${valueToPercentage(end - start)}%`
          }
        : {
            [styleDirection]: `${valueToPercentage(start)}%`,
            width: `${valueToPercentage(end - start)}%`
          }
    })

    const dotTransitionDisabledRef = ref(false)

    const markInfosRef = computed(() => {
      const mergedMarks = []
      const { marks } = props
      if (marks) {
        const orderValues = mergedValuesRef.value.slice()
        orderValues.sort((a, b) => a - b)
        const { value: styleDirection } = styleDirectionRef
        const { range } = props
        for (const key of Object.keys(marks)) {
          const num = Number(key)
          mergedMarks.push({
            active: range
              ? num >= orderValues[0] &&
                num <= orderValues[orderValues.length - 1]
              : num >= orderValues[0],
            label: marks[key],
            style: {
              [styleDirection]: `${valueToPercentage(num)}%`
            }
          })
        }
      }
      return mergedMarks
    })

    function isShowTooltip (index: number): boolean {
      return (
        props.showTooltip ||
        hoverIndexRef.value === index ||
        activeIndexRef.value === index
      )
    }

    function isSkipCSSDetection (index: number): boolean {
      return !(
        activeIndexRef.value === index && previousIndexRef.value === index
      )
    }

    function focusActiveHandle (index = activeIndexRef.value): void {
      if (~index) {
        handleRefs.value?.[index].focus()
      }
    }

    function syncPosition (): void {
      followerRefs.value.forEach((inst, index) => {
        if (isShowTooltip(index)) inst.syncPosition()
      })
    }

    function getHandleStyle (
      value: number,
      index: number
    ): Record<string, any> {
      const percentage = valueToPercentage(value)
      const { value: styleDirection } = styleDirectionRef
      return {
        [styleDirection]: `${percentage}%`,
        zIndex: index === activeIndexRef.value ? 1 : 0
      }
    }

    function doUpdateValue (value: number | number[]): void {
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange as OnUpdateValueImpl, value)
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }

    function dispatchValueUpdate (value: number | number[]): void {
      const { range } = props
      if (range) {
        if (Array.isArray(value)) {
          const { value: oldValues } = mergedValuesRef
          if (value.join() !== oldValues.join()) {
            doUpdateValue(value)
          }
        }
      } else if (!Array.isArray(value)) {
        const oldValue = mergedValuesRef.value[0]
        if (oldValue !== value) {
          doUpdateValue(value)
        }
      }
    }

    function doDispatchValue (value: number, index: number): void {
      if (props.range) {
        const values = mergedValuesRef.value.slice()
        values.splice(index, 1, value)
        dispatchValueUpdate(values)
      } else {
        dispatchValueUpdate(value)
      }
    }

    function getClosestMark (
      currentValue: number,
      markValues = propMarkValues.value,
      buffer?: number
    ): ClosestMark | null {
      if (markValues) {
        let closestMark = null
        let index = -1
        while (++index < markValues.length) {
          const diff = markValues[index] - currentValue
          const distance = Math.abs(diff)
          if (
            (buffer === undefined || diff * buffer > 0) &&
            (closestMark === null || distance < closestMark.distance)
          ) {
            closestMark = {
              value: markValues[index],
              distance,
              index
            }
          }
        }
        return closestMark
      }
      return null
    }

    function sanitizeValue (
      value: number,
      currentValue: number,
      stepBuffer?: number
    ): number {
      const stepping = stepBuffer !== undefined
      if (!stepBuffer) {
        stepBuffer = value - currentValue > 0 ? 1 : -1
      }
      const markValues = propMarkValues.value || []
      const { min, max, step } = props
      if (!step) {
        const closestMark = getClosestMark(
          value,
          markValues.concat(currentValue),
          stepBuffer
        ) as ClosestMark
        return closestMark.value
      }
      const roundValue = getRoundValue(value)
      // ensure accurate step
      const stepValue = new Array(Math.floor((max - min) / step) + 1)
        .fill('')
        .map((_, index) => step * index + min)
      // If it is a stepping, priority will be given to the marks
      // on the rail，otherwise take the nearest one
      const closestMark = stepping
        ? getClosestMark(currentValue, stepValue.concat(markValues), stepBuffer)
        : getClosestMark(value, markValues.concat(roundValue))
      return closestMark ? clampValue(closestMark.value) : currentValue
    }

    function clampValue (value: number): number {
      return Math.min(props.max, Math.max(props.min, value))
    }

    function valueToPercentage (value: number): number {
      const { max, min } = props
      return ((value - min) / (max - min)) * 100
    }

    function percentageToValue (percentage: number): number {
      const { max, min } = props
      return min + (max - min) * percentage
    }

    function getRoundValue (value: number): number {
      const { step, min } = props
      const newValue = Math.round((value - min) / step) * step + min
      return Number(newValue.toFixed(precisionRef.value))
    }

    function getPointValue (
      event: MouseEvent | TouchEvent
    ): number | undefined {
      const railEl = handleRailRef.value
      if (!railEl) return

      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      const railRect = railEl.getBoundingClientRect()

      let percentage: number
      if (props.vertical) {
        percentage = (railRect.bottom - touchEvent.clientY) / railRect.height
      } else {
        percentage = (touchEvent.clientX - railRect.left) / railRect.width
      }

      if (props.reverse) {
        percentage = 1 - percentage
      }

      return percentageToValue(percentage)
    }

    function handleRailKeyDown (e: KeyboardEvent): void {
      if (mergedDisabledRef.value) return
      const { vertical, reverse } = props
      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault()
          handleStepValue(vertical && reverse ? -1 : 1)
          break
        case 'ArrowRight':
          e.preventDefault()
          handleStepValue(!vertical && reverse ? -1 : 1)
          break
        case 'ArrowDown':
          e.preventDefault()
          handleStepValue(vertical && reverse ? 1 : -1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          handleStepValue(!vertical && reverse ? 1 : -1)
          break
      }
    }

    function handleStepValue (ratio: number): void {
      const activeIndex = activeIndexRef.value
      if (activeIndex === -1) return
      const { step } = props
      const currentValue = mergedValuesRef.value[activeIndex]
      const nextValue = currentValue + step * ratio
      doDispatchValue(
        // Avoid the number of value does not change when `step` is null
        sanitizeValue(nextValue, currentValue, ratio > 0 ? 1 : -1),
        activeIndex
      )
    }

    function handleRailMouseDown (event: MouseEvent | TouchEvent): void {
      if (mergedDisabledRef.value) return
      if (!isTouchEvent(event) && event.button !== MouseButtonLeft) {
        return
      }
      const pointValue = getPointValue(event)
      if (pointValue === undefined) return

      const values = mergedValuesRef.value.slice()
      const activeIndex = props.range
        ? getClosestMark(pointValue, values)?.index ?? -1
        : 0
      activeIndexRef.value = activeIndex

      if (activeIndex !== -1) {
        // avoid triggering scrolling on touch
        event.preventDefault()
        draggingRef.value = true
        focusActiveHandle(activeIndex)
        doDispatchValue(
          sanitizeValue(pointValue, mergedValuesRef.value[activeIndex]),
          activeIndex
        )
      }
    }

    function handleMouseMove (event: MouseEvent | TouchEvent): void {
      const activeIndex = activeIndexRef.value
      if (!draggingRef.value || activeIndex === -1) return

      const pointValue = getPointValue(event) as number
      doDispatchValue(
        sanitizeValue(pointValue, mergedValuesRef.value[activeIndex]),
        activeIndex
      )
    }

    function handleMouseUp (): void {
      draggingRef.value = false
    }

    function handleHandleFocus (index: number): void {
      activeIndexRef.value = index
    }

    function handleHandleBlur (index: number): void {
      if (activeIndexRef.value === index) {
        activeIndexRef.value = -1
        draggingRef.value = false
      }
    }

    function handleHandleMouseEnter (index: number): void {
      hoverIndexRef.value = index
    }

    function handleHandleMouseLeave (index: number): void {
      if (hoverIndexRef.value === index) {
        hoverIndexRef.value = -1
      }
    }

    watch(activeIndexRef, (_, previous) => (previousIndexRef.value = previous))

    watch(mergedValueRef, () => {
      if (props.marks) {
        if (dotTransitionDisabledRef.value) return
        dotTransitionDisabledRef.value = true
        void nextTick(() => {
          dotTransitionDisabledRef.value = false
        })
      }
      void nextTick(syncPosition)
    })

    onBeforeUpdate(() => {
      handleRefs.value.length = 0
      followerRefs.value.length = 0
    })
    onBeforeMount(() => {
      on('touchend', document, handleMouseUp)
      on('mouseup', document, handleMouseUp)
      on('touchmove', document, handleMouseMove)
      on('mousemove', document, handleMouseMove)
    })
    onBeforeUnmount(() => {
      off('touchend', document, handleMouseUp)
      off('mouseup', document, handleMouseUp)
      off('touchmove', document, handleMouseMove)
      off('mousemove', document, handleMouseMove)
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedDisabled: mergedDisabledRef,
      mergedPlacement: mergedPlacementRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      dotTransitionDisabled: dotTransitionDisabledRef,
      markInfos: markInfosRef,
      isShowTooltip,
      isSkipCSSDetection,
      handleRailRef,
      handleRefs,
      followerRefs,
      fillStyle: fillStyleRef,
      getHandleStyle,
      activeIndex: activeIndexRef,
      mergedValues: mergedValuesRef,
      handleRailMouseDown,
      handleHandleFocus,
      handleHandleBlur,
      handleHandleMouseEnter,
      handleHandleMouseLeave,
      handleRailKeyDown,
      indicatorCssVars: computed(() => {
        const {
          self: {
            fontSize,
            indicatorColor,
            indicatorBoxShadow,
            indicatorTextColor,
            indicatorBorderRadius
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--indicator-border-radius': indicatorBorderRadius,
          '--indicator-box-shadow': indicatorBoxShadow,
          '--indicator-color': indicatorColor,
          '--indicator-text-color': indicatorTextColor
        }
      }),
      cssVars: computed(() => {
        const {
          self: {
            railColor,
            railColorHover,
            fillColor,
            fillColorHover,
            handleColor,
            opacityDisabled,
            dotColor,
            dotColorModal,
            handleBoxShadow,
            handleBoxShadowHover,
            handleBoxShadowActive,
            handleBoxShadowFocus,
            dotBorder,
            dotBoxShadow,
            railHeight,
            railWidthVertical,
            handleSize,
            dotHeight,
            dotWidth,
            dotBorderRadius,
            fontSize,
            dotBorderActive,
            dotColorPopover
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--dot-border': dotBorder,
          '--dot-border-active': dotBorderActive,
          '--dot-border-radius': dotBorderRadius,
          '--dot-box-shadow': dotBoxShadow,
          '--dot-color': dotColor,
          '--dot-color-modal': dotColorModal,
          '--dot-color-popover': dotColorPopover,
          '--dot-height': dotHeight,
          '--dot-width': dotWidth,
          '--fill-color': fillColor,
          '--fill-color-hover': fillColorHover,
          '--font-size': fontSize,
          '--handle-box-shadow': handleBoxShadow,
          '--handle-box-shadow-active': handleBoxShadowActive,
          '--handle-box-shadow-focus': handleBoxShadowFocus,
          '--handle-box-shadow-hover': handleBoxShadowHover,
          '--handle-color': handleColor,
          '--handle-size': handleSize,
          '--opacity-disabled': opacityDisabled,
          '--rail-color': railColor,
          '--rail-color-hover': railColorHover,
          '--rail-height': railHeight,
          '--rail-width-vertical': railWidthVertical
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix, formatTooltip } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-slider`,
          {
            [`${mergedClsPrefix}-slider--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-slider--active`]: this.activeIndex !== -1,
            [`${mergedClsPrefix}-slider--with-mark`]: this.marks,
            [`${mergedClsPrefix}-slider--vertical`]: this.vertical,
            [`${mergedClsPrefix}-slider--reverse`]: this.reverse
          }
        ]}
        style={this.cssVars as CSSProperties}
        onKeydown={this.handleRailKeyDown}
        onMousedown={this.handleRailMouseDown}
        onTouchstart={this.handleRailMouseDown}
      >
        <div class={`${mergedClsPrefix}-slider-rail`}>
          <div
            class={`${mergedClsPrefix}-slider-rail__fill`}
            style={this.fillStyle}
          />
          {this.marks ? (
            <div
              class={[
                `${mergedClsPrefix}-slider-dots`,
                {
                  [`${mergedClsPrefix}-slider-dots--transition-disabled`]: this
                    .dotTransitionDisabled
                }
              ]}
            >
              {this.markInfos.map(mark => (
                <div
                  key={mark.label}
                  class={[
                    `${mergedClsPrefix}-slider-dot`,
                    {
                      [`${mergedClsPrefix}-slider-dot--active`]: mark.active
                    }
                  ]}
                  style={mark.style}
                />
              ))}
            </div>
          ) : null}
          <div ref='handleRailRef' class={`${mergedClsPrefix}-slider-handles`}>
            {this.mergedValues.map((value, index) => {
              const showTooltip = this.isShowTooltip(index)
              return (
                <VBinder>
                  {{
                    default: () => [
                      <VTarget>
                        {{
                          default: () => (
                            <div
                              ref={
                                ((el: HTMLElement) => {
                                  if (el) {
                                    this.handleRefs[index] = el
                                  }
                                }) as () => void
                              }
                              class={`${mergedClsPrefix}-slider-handle`}
                              tabindex={this.mergedDisabled ? -1 : 0}
                              style={this.getHandleStyle(value, index)}
                              onFocus={() => this.handleHandleFocus(index)}
                              onBlur={() => this.handleHandleBlur(index)}
                              onMouseenter={() =>
                                this.handleHandleMouseEnter(index)
                              }
                              onMouseleave={() =>
                                this.handleHandleMouseLeave(index)
                              }
                            />
                          )
                        }}
                      </VTarget>,
                      this.tooltip && (
                        <VFollower
                          ref={
                            ((inst: FollowerInst) => {
                              if (inst) {
                                this.followerRefs[index] = inst
                              }
                            }) as () => void
                          }
                          show={showTooltip}
                          to={this.adjustedTo}
                          teleportDisabled={
                            this.adjustedTo === useAdjustedTo.tdkey
                          }
                          placement={this.mergedPlacement}
                          containerClass={this.namespace}
                        >
                          {{
                            default: () => (
                              <Transition
                                name='fade-in-scale-up-transition'
                                appear={this.isMounted}
                                css={this.isSkipCSSDetection(index)}
                              >
                                {{
                                  default: () =>
                                    showTooltip ? (
                                      <div
                                        class={[
                                          `${mergedClsPrefix}-slider-handle-indicator`,
                                          `${mergedClsPrefix}-slider-handle-indicator--${this.mergedPlacement}`
                                        ]}
                                        style={
                                          this.indicatorCssVars as CSSProperties
                                        }
                                      >
                                        {typeof formatTooltip === 'function'
                                          ? formatTooltip(value)
                                          : value}
                                      </div>
                                    ) : null
                                }}
                              </Transition>
                            )
                          }}
                        </VFollower>
                      )
                    ]
                  }}
                </VBinder>
              )
            })}
          </div>
          {this.marks ? (
            <div class={`${mergedClsPrefix}-slider-marks`}>
              {this.markInfos.map(mark => (
                <div
                  key={mark.label}
                  class={`${mergedClsPrefix}-slider-mark`}
                  style={mark.style}
                >
                  {mark.label}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})
