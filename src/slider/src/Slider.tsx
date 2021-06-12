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
  CSSProperties
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
import { useTheme, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, useAdjustedTo } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { sliderLight, SliderTheme } from '../styles'
import style from './styles/index.cssr'
import { OnUpdateValueImpl } from './interface'

const sliderProps = {
  ...(useTheme.props as ThemeProps<SliderTheme>),
  to: useAdjustedTo.propTo,
  defaultValue: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0
  },
  marks: Object as PropType<Record<string, string>>,
  disabled: {
    type: Boolean,
    default: false
  },
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
  range: {
    type: Boolean,
    default: false
  },
  value: [Number, Array] as PropType<number | [number, number]>,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'top'
  },
  showTooltip: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<<T extends number & [number, number]>(value: T) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<<T extends number & [number, number]>(value: T) => void>
  >,
  // deprecated
  onChange: {
    type: [Function, Array] as PropType<
    MaybeArray<<T extends number & [number, number]>(value: T) => void>
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

    const handleRef1 = ref<HTMLElement | null>(null)
    const handleRef2 = ref<HTMLElement | null>(null)
    const railRef = ref<HTMLElement | null>(null)
    const followerRef1 = ref<FollowerInst | null>(null)
    const followerRef2 = ref<FollowerInst | null>(null)

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const memoziedOtherValueRef = ref<number>(0)
    const changeSourceRef = ref<'click' | 'keyboard' | null>(null)

    const handleActive1Ref = ref(false)
    const handleActive2Ref = ref(false)
    const handleClicked1Ref = ref(false)
    const handleClicked2Ref = ref(false)

    const controlledShowTooltipRef = toRef(props, 'showTooltip')
    const mergedShowTooltip1Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive1Ref
    )
    const mergedShowTooltip2Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive2Ref
    )
    const dotTransitionDisabledRef = ref(false)

    const activeRef = computed(() => {
      return handleActive1Ref.value || handleActive2Ref.value
    })
    const prevActiveRef = ref(activeRef.value)
    const clickedRef = computed(() => {
      return handleClicked1Ref.value || handleClicked2Ref.value
    })
    const markInfosRef = computed(() => {
      const mergedMarks = []
      const { marks, max, min } = props
      if (marks) {
        const { value: mergedValue } = mergedValueRef
        for (const key of Object.keys(marks)) {
          const num = Number(key)
          mergedMarks.push({
            active: Array.isArray(mergedValue)
              ? mergedValue[0] <= num && mergedValue[1] >= num
              : mergedValue !== null
                ? mergedValue >= num
                : false,
            label: marks[key],
            style: {
              left: `${((num - min) / (max - min)) * 100}%`
            }
          })
        }
      }
      return mergedMarks
    })
    const fillStyleRef = computed(() => {
      const { max, min, range } = props
      if (range) {
        return {
          left: `${((handleValue1Ref.value - min) / (max - min)) * 100}%`,
          width: `${
            ((handleValue2Ref.value - handleValue1Ref.value) / (max - min)) *
            100
          }%`
        }
      } else {
        return {
          left: 0,
          width: `${((handleValue1Ref.value - min) / (max - min)) * 100}%`
        }
      }
    })
    const handleValue1Ref = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        return sanitizeValue(mergedValue[0])
      } else {
        return sanitizeValue(mergedValue)
      }
    })
    const handleValue2Ref = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        return sanitizeValue(mergedValue[1])
      }
      return 0
    })
    const firstHandleStyleRef = computed(() => {
      const { value: handleValue1 } = handleValue1Ref
      const { value: handleClicked1 } = handleClicked1Ref
      const { max, min } = props
      const percentage = ((handleValue1 - min) / (max - min)) * 100
      return {
        left: `${percentage}%`,
        transform: `translateX(${-percentage}%)`,
        zIndex: handleClicked1 ? 1 : 0
      }
    })
    const secondHandleStyleRef = computed(() => {
      const { value: handleValue2 } = handleValue2Ref
      const { value: handleClicked2 } = handleClicked2Ref
      const { max, min } = props
      const percentage = ((handleValue2 - min) / (max - min)) * 100
      return {
        left: `${percentage}%`,
        transform: `translateX(${-percentage}%)`,
        zIndex: handleClicked2 ? 1 : 0
      }
    })
    function doUpdateValue (value: number | [number, number]): void {
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
    function doUpdateShow (show1?: boolean, show2?: boolean): void {
      if (show1 !== undefined) {
        handleActive1Ref.value = show1
      }
      if (show2 !== undefined) {
        handleActive2Ref.value = show2
      }
    }
    function syncPosition (): void {
      followerRef1.value?.syncPosition()
      followerRef2.value?.syncPosition()
    }
    function handleHandleFocus1 (): void {
      if (clickedRef.value) return
      doUpdateShow(true, false)
    }
    function handleHandleFocus2 (): void {
      if (clickedRef.value) return
      doUpdateShow(false, true)
    }
    function handleHandleBlur1 (): void {
      if (clickedRef.value) return
      doUpdateShow(false, false)
    }
    function handleHandleBlur2 (): void {
      if (clickedRef.value) return
      doUpdateShow(false, false)
    }
    function handleRailClick (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return
      const railRect = railEl.getBoundingClientRect()
      const offsetRatio = (e.clientX - railRect.left) / railRect.width
      const newValue = props.min + (props.max - props.min) * offsetRatio
      if (!props.range) {
        dispatchValueUpdate(newValue, { source: 'click' })
        handleRef1.value?.focus()
      } else {
        if (Array.isArray(mergedValueRef.value)) {
          if (
            Math.abs(handleValue1Ref.value - newValue) <
            Math.abs(handleValue2Ref.value - newValue)
          ) {
            dispatchValueUpdate([newValue, handleValue2Ref.value], {
              source: 'click'
            })
            handleRef1.value?.focus()
          } else {
            dispatchValueUpdate([handleValue1Ref.value, newValue], {
              source: 'click'
            })
            handleRef2.value?.focus()
          }
        } else {
          dispatchValueUpdate([newValue, newValue], { source: 'click' })
          handleRef1.value?.focus()
        }
      }
    }
    function handleHandleMouseMove (
      e: MouseEvent | TouchEvent,
      handleIndex: 0 | 1
    ): void {
      if (!handleRef1.value || !railRef.value) return
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      const { width: handleWidth } = handleRef1.value.getBoundingClientRect()
      const { width: railWidth, left: railLeft } =
        railRef.value.getBoundingClientRect()
      const { min, max, range } = props
      const offsetRatio =
        (x - railLeft - handleWidth / 2) / (railWidth - handleWidth)
      const newValue = min + (max - min) * offsetRatio
      if (range) {
        if (handleIndex === 0) {
          dispatchValueUpdate([memoziedOtherValueRef.value, newValue])
        } else {
          dispatchValueUpdate([newValue, memoziedOtherValueRef.value])
        }
      } else {
        dispatchValueUpdate(newValue)
      }
    }
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'ArrowRight':
          handleKeyDownRight()
          break
        case 'ArrowLeft':
          handleKeyDownLeft()
          break
      }
    }
    function handleKeyDownRight (): void {
      if (clickedRef.value) return
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === handleRef1.value) {
        firstHandleFocused = true
        handleValue = handleValue1Ref.value
      } else {
        handleValue = handleValue2Ref.value
      }
      const { step, marks } = props
      let nextValue = Math.floor(handleValue / step) * step + step
      if (marks) {
        for (const key of Object.keys(marks)) {
          const numberKey = Number(key)
          if (numberKey > handleValue && numberKey < nextValue) {
            nextValue = numberKey
          }
        }
      }
      if (props.range) {
        if (firstHandleFocused) {
          dispatchValueUpdate([nextValue, handleValue2Ref.value], {
            source: 'keyboard'
          })
        } else {
          dispatchValueUpdate([handleValue1Ref.value, nextValue], {
            source: 'keyboard'
          })
        }
      } else {
        dispatchValueUpdate(nextValue, { source: 'keyboard' })
      }
    }
    function handleKeyDownLeft (): void {
      if (clickedRef.value) return
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === handleRef1.value) {
        firstHandleFocused = true
        handleValue = handleValue1Ref.value
      } else if (document.activeElement === handleRef2.value) {
        handleValue = handleValue2Ref.value
      } else {
        return
      }
      const { step, marks } = props
      let nextValue = Math.ceil(handleValue / step) * step - step
      if (marks) {
        for (const key of Object.keys(marks)) {
          const numberKey = Number(key)
          if (numberKey < handleValue && numberKey > nextValue) {
            nextValue = numberKey
          }
        }
      }
      if (props.range) {
        if (firstHandleFocused) {
          dispatchValueUpdate([nextValue, handleValue2Ref.value], {
            source: 'keyboard'
          })
        } else {
          dispatchValueUpdate([handleValue1Ref.value, nextValue], {
            source: 'keyboard'
          })
        }
      } else {
        dispatchValueUpdate(nextValue, { source: 'keyboard' })
      }
    }
    function switchFocus (): void {
      if (props.range) {
        const firstHandle = handleRef1.value
        const secondHandle = handleRef2.value
        if (firstHandle && secondHandle) {
          if (
            handleActive1Ref.value &&
            document.activeElement === secondHandle
          ) {
            disableTransitionOneTick()
            firstHandle.focus()
            if (handleClicked2Ref.value) {
              handleClicked2Ref.value = false
              handleClicked1Ref.value = true
            }
          } else if (
            handleActive2Ref.value &&
            document.activeElement === firstHandle
          ) {
            disableTransitionOneTick()
            secondHandle.focus()
            if (handleClicked1Ref.value) {
              handleClicked1Ref.value = false
              handleClicked2Ref.value = true
            }
          }
        }
      }
    }
    function getClosestMarkValue (currentValue: number): number | null {
      const { marks } = props
      if (marks) {
        const markValues = Object.keys(marks).map((key) => Number(key))
        let diff: number | null = null
        let closestValue: number | null = null
        for (const value of markValues) {
          if (closestValue === null) {
            closestValue = value
            diff = Math.abs(value - currentValue)
          } else {
            const newDiff = Math.abs(value - currentValue)
            if (newDiff < (diff as number)) {
              closestValue = value
              diff = newDiff
            }
          }
        }
        return closestValue
      }
      return null
    }
    function sanitizeValue (value: number): number {
      let justifiedValue = value
      const { min, max, marks, step } = props
      justifiedValue = Math.max(min, justifiedValue)
      justifiedValue = Math.min(max, justifiedValue)
      justifiedValue = Math.round((justifiedValue - min) / step) * step + min
      if (marks) {
        const closestMarkValue = getClosestMarkValue(value)
        if (
          closestMarkValue !== null &&
          Math.abs(justifiedValue - value) > Math.abs(closestMarkValue - value)
        ) {
          justifiedValue = closestMarkValue
        }
      }
      return justifiedValue
    }
    function handleFirstHandleMouseDown (): void {
      if (props.range) {
        memoziedOtherValueRef.value = handleValue2Ref.value
      }
      doUpdateShow(true, false)
      handleClicked1Ref.value = true
      on('touchend', document, handleHandleMouseUp)
      on('mouseup', document, handleHandleMouseUp)
      on('touchmove', document, handleFirstHandleMouseMove)
      on('mousemove', document, handleFirstHandleMouseMove)
    }
    function handleSecondHandleMouseDown (): void {
      if (props.range) {
        memoziedOtherValueRef.value = handleValue1Ref.value
      }
      doUpdateShow(false, true)
      handleClicked2Ref.value = true
      on('touchend', document, handleHandleMouseUp)
      on('mouseup', document, handleHandleMouseUp)
      on('touchmove', document, handleSecondHandleMouseMove)
      on('mousemove', document, handleSecondHandleMouseMove)
    }
    function handleHandleMouseUp (e: MouseEvent | TouchEvent): void {
      if (
        (window.TouchEvent && e instanceof window.TouchEvent) ||
        (!handleRef1.value?.contains(e.target as Node) &&
          (props.range ? !handleRef2.value?.contains(e.target as Node) : true))
      ) {
        doUpdateShow(false, false)
      }
      handleClicked2Ref.value = false
      handleClicked1Ref.value = false
      off('touchend', document, handleHandleMouseUp)
      off('mouseup', document, handleHandleMouseUp)
      off('touchmove', document, handleFirstHandleMouseMove)
      off('touchmove', document, handleSecondHandleMouseMove)
      off('mousemove', document, handleFirstHandleMouseMove)
      off('mousemove', document, handleSecondHandleMouseMove)
    }
    function dispatchValueUpdate (
      value: number | [number, number],
      options: { source: 'keyboard' | 'click' | null } = { source: null }
    ): void {
      const { source } = options
      const { range } = props
      if (range) {
        if (Array.isArray(value)) {
          if (value[0] > value[1]) {
            value = [sanitizeValue(value[1]), sanitizeValue(value[0])]
          } else {
            value = [sanitizeValue(value[0]), sanitizeValue(value[1])]
          }
          const { value: oldValue } = mergedValueRef
          if (
            !Array.isArray(oldValue) ||
            oldValue[0] !== value[0] ||
            oldValue[1] !== value[1]
          ) {
            changeSourceRef.value = source
            doUpdateValue(value)
          }
        }
      } else {
        if (!Array.isArray(value)) {
          const { max, min } = props
          const { value: oldValue } = mergedValueRef
          if (value > max) {
            if (oldValue !== max) {
              changeSourceRef.value = source
              doUpdateValue(max)
            }
          } else if (value < min) {
            if (oldValue !== min) {
              changeSourceRef.value = source
              doUpdateValue(min)
            }
          } else {
            const newValue = sanitizeValue(value)
            if (oldValue !== newValue) {
              changeSourceRef.value = source
              doUpdateValue(newValue)
            }
          }
        }
      }
    }
    function handleFirstHandleMouseMove (e: MouseEvent | TouchEvent): void {
      handleHandleMouseMove(e, 0)
    }
    function handleSecondHandleMouseMove (e: MouseEvent | TouchEvent): void {
      handleHandleMouseMove(e, 1)
    }
    function handleFirstHandleMouseEnter (): void {
      if (!activeRef.value) {
        doUpdateShow(true, undefined)
        void nextTick(() => {
          syncPosition()
        })
      }
    }
    function handleFirstHandleMouseLeave (): void {
      if (changeSourceRef.value === 'keyboard') return
      if (!activeRef.value) {
        doUpdateShow(false, false)
      } else if (!clickedRef.value) {
        doUpdateShow(false, false)
      }
    }
    function handleSecondHandleMouseEnter (): void {
      if (!activeRef.value) {
        doUpdateShow(undefined, true)
        void nextTick(() => {
          syncPosition()
        })
      }
    }
    function handleSecondHandleMouseLeave (): void {
      if (changeSourceRef.value === 'keyboard') return
      if (!activeRef.value) {
        doUpdateShow(false, false)
      } else if (!clickedRef.value) {
        doUpdateShow(false, false)
      }
    }
    function disableTransitionOneTick (): void {
      if (handleRef1.value) {
        handleRef1.value.style.transition = 'none'
        void nextTick(() => {
          if (handleRef1.value) {
            handleRef1.value.style.transition = ''
          }
        })
      }
      if (handleRef2.value) {
        handleRef2.value.style.transition = 'none'
        void nextTick(() => {
          if (handleRef2.value) {
            handleRef2.value.style.transition = ''
          }
        })
      }
    }
    watch(activeRef, (value) => {
      void nextTick(() => {
        prevActiveRef.value = value
      })
    })
    watch(mergedValueRef, (newValue, oldValue) => {
      const { value: changeSource } = changeSourceRef
      if (props.marks) {
        if (dotTransitionDisabledRef.value) return
        dotTransitionDisabledRef.value = true
        void nextTick(() => {
          dotTransitionDisabledRef.value = false
        })
      }
      if (props.range && Array.isArray(newValue) && Array.isArray(oldValue)) {
        if (oldValue && oldValue[1] !== newValue[1]) {
          void nextTick(() => {
            if (!(changeSource === 'click')) {
              doUpdateShow(false, true)
            }
            switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          void nextTick(() => {
            if (!(changeSource === 'click')) {
              doUpdateShow(true, false)
            }
            switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          void nextTick(() => {
            if (!(changeSource === 'click')) {
              doUpdateShow(false, true)
            }
            switchFocus()
          })
        }
      }
      void nextTick(() => {
        // dom has changed but event is not fired, use marco task to make sure
        // relevant event handler is called
        setTimeout(() => {
          changeSourceRef.value = null
        }, 0)
        if (props.range) {
          if (Array.isArray(newValue) && Array.isArray(oldValue)) {
            if (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]) {
              syncPosition()
            }
          }
        } else {
          syncPosition()
        }
      })
    })
    onBeforeUnmount(() => {
      off('touchmove', document, handleFirstHandleMouseMove)
      off('touchmove', document, handleSecondHandleMouseMove)
      off('mousemove', document, handleFirstHandleMouseMove)
      off('mousemove', document, handleSecondHandleMouseMove)
      off('touchend', document, handleHandleMouseUp)
      off('mouseup', document, handleHandleMouseUp)
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      handleValue1: handleValue1Ref,
      handleValue2: handleValue2Ref,
      mergedShowTooltip1: mergedShowTooltip1Ref,
      mergedShowTooltip2: mergedShowTooltip2Ref,
      handleActive1: handleActive1Ref,
      handleActive2: handleActive2Ref,
      handleClicked1: handleClicked1Ref,
      handleClicked2: handleClicked2Ref,
      memoziedOtherValue: memoziedOtherValueRef,
      active: activeRef,
      prevActive: prevActiveRef,
      clicked: clickedRef,
      dotTransitionDisabled: dotTransitionDisabledRef,
      markInfos: markInfosRef,
      // https://github.com/vuejs/vue-next/issues/2283
      handleRef1,
      handleRef2,
      railRef,
      followerRef1,
      followerRef2,
      firstHandleStyle: firstHandleStyleRef,
      secondHandleStyle: secondHandleStyleRef,
      fillStyle: fillStyleRef,
      handleKeyDown,
      handleRailClick,
      handleHandleFocus1,
      handleHandleBlur1,
      handleFirstHandleMouseDown,
      handleFirstHandleMouseEnter,
      handleFirstHandleMouseLeave,
      handleHandleFocus2,
      handleHandleBlur2,
      handleSecondHandleMouseDown,
      handleSecondHandleMouseEnter,
      handleSecondHandleMouseLeave,
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
            dotColor,
            dotColorModal,
            handleBoxShadow,
            handleBoxShadowHover,
            handleBoxShadowActive,
            handleBoxShadowFocus,
            dotBorder,
            dotBoxShadow,
            railHeight,
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
          '--rail-color': railColor,
          '--rail-color-hover': railColorHover,
          '--rail-height': railHeight
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-slider`,
          {
            [`${mergedClsPrefix}-slider--disabled`]: this.disabled,
            [`${mergedClsPrefix}-slider--active`]: this.active,
            [`${mergedClsPrefix}-slider--with-mark`]: this.marks
          }
        ]}
        style={this.cssVars as CSSProperties}
        onKeydown={this.handleKeyDown}
        onClick={this.handleRailClick}
      >
        <div ref="railRef" class={`${mergedClsPrefix}-slider-rail`}>
          <div
            class={`${mergedClsPrefix}-slider-rail__fill`}
            style={this.fillStyle}
          />
          {this.marks ? (
            <div
              class={[
                `${mergedClsPrefix}-slider-dots`,
                {
                  [`${mergedClsPrefix}-slider-dots--transition-disabled`]:
                    this.dotTransitionDisabled
                }
              ]}
            >
              {this.markInfos.map((mark) => (
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
        </div>
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <div
                      ref="handleRef1"
                      class={`${mergedClsPrefix}-slider-handle`}
                      tabindex={0}
                      style={this.firstHandleStyle}
                      onFocus={this.handleHandleFocus1}
                      onBlur={this.handleHandleBlur1}
                      onTouchstart={this.handleFirstHandleMouseDown}
                      onMousedown={this.handleFirstHandleMouseDown}
                      onMouseenter={this.handleFirstHandleMouseEnter}
                      onMouseleave={this.handleFirstHandleMouseLeave}
                    />
                  )
                }}
              </VTarget>,
              <VFollower
                ref="followerRef1"
                show={this.mergedShowTooltip1}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                placement={this.placement}
                containerClass={this.namespace}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                      css={!(this.active && this.prevActive)}
                    >
                      {{
                        default: () =>
                          this.mergedShowTooltip1 ? (
                            <div
                              class={`${mergedClsPrefix}-slider-handle-indicator`}
                              style={this.indicatorCssVars as CSSProperties}
                            >
                              {this.handleValue1}
                            </div>
                          ) : null
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
        {this.range ? (
          <VBinder>
            {{
              default: () => [
                <VTarget>
                  {{
                    default: () => (
                      <div
                        ref="handleRef2"
                        class={`${mergedClsPrefix}-slider-handle`}
                        tabindex={0}
                        style={this.secondHandleStyle}
                        onFocus={this.handleHandleFocus2}
                        onBlur={this.handleHandleBlur2}
                        onTouchstart={this.handleSecondHandleMouseDown}
                        onMousedown={this.handleSecondHandleMouseDown}
                        onMouseenter={this.handleSecondHandleMouseEnter}
                        onMouseleave={this.handleSecondHandleMouseLeave}
                      />
                    )
                  }}
                </VTarget>,
                <VFollower
                  ref="followerRef2"
                  show={this.mergedShowTooltip2}
                  to={this.adjustedTo}
                  placement={this.placement}
                  containerClass={this.namespace}
                  teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                >
                  {{
                    default: () => (
                      <Transition
                        name="fade-in-scale-up-transition"
                        appear={this.isMounted}
                        css={!(this.active && this.prevActive)}
                      >
                        {{
                          default: () =>
                            this.mergedShowTooltip2 ? (
                              <div
                                class={`${mergedClsPrefix}-slider-handle-indicator`}
                                style={this.indicatorCssVars as CSSProperties}
                              >
                                {this.handleValue2}
                              </div>
                            ) : null
                        }}
                      </Transition>
                    )
                  }}
                </VFollower>
              ]
            }}
          </VBinder>
        ) : null}
        {this.marks ? (
          <div class={`${mergedClsPrefix}-slider-marks`}>
            {this.markInfos.map((mark) => (
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
    )
  }
})
