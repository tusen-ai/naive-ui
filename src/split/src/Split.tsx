import {
  type CSSProperties,
  Fragment,
  type PropType,
  type StyleValue,
  computed,
  defineComponent,
  h,
  onMounted,
  ref
} from 'vue'
import { off, on } from 'evtd'
import { VResizeObserver } from 'vueuc'
import { type ThemeProps, useTheme, useThemeClass } from '../../_mixins'
import useConfig from '../../_mixins/use-config'
import type { ExtractPublicPropTypes } from '../../_utils'
import { type SplitTheme, splitLight } from '../styles'
import type { SizeType, SplitOnUpdateSize } from './types'
import style from './styles/index.cssr'

export const splitProps = {
  ...(useTheme.props as ThemeProps<SplitTheme>),
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  resizeTriggerSize: {
    type: Number,
    default: 3
  },
  disabled: Boolean,
  defaultSize: {
    type: [Number, String, Array] as PropType<SizeType>,
    default: undefined
  },
  'onUpdate:size': [Function, Array] as PropType<
    SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  onUpdateSize: [Function, Array] as PropType<
    SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  size: {
    type: [Number, String, Array] as PropType<SizeType>,
    default: undefined
  },
  min: {
    type: [Number, String, Array] as PropType<SizeType>,
    default: undefined
  },
  max: {
    type: [Number, String, Array] as PropType<SizeType>,
    default: undefined
  },
  snapOffset: {
    type: Number,
    default: 0
  },
  pane1Class: String,
  pane1Style: [Object, String] as PropType<CSSProperties | string>,
  pane2Class: String,
  pane2Style: [Object, String] as PropType<CSSProperties | string>,
  onDragStart: Function as PropType<(e: Event) => void>,
  onDragMove: Function as PropType<(e: Event) => void>,
  onDragEnd: Function as PropType<(e: Event) => void>,
  watchProps: Array as PropType<Array<'defaultSize'>>
} as const

export type SplitProps = ExtractPublicPropTypes<typeof splitProps>

export default defineComponent({
  name: 'Split',
  inheritAttrs: false,
  props: splitProps,
  setup(props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Split',
      '-split',
      style,
      splitLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { resizableTriggerColor, resizableTriggerColorHover }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-resize-trigger-color': resizableTriggerColor,
        '--n-resize-trigger-color-hover': resizableTriggerColorHover
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('split', undefined, cssVarsRef, props)
      : undefined

    const isHorizontal = props.direction === 'horizontal'
    const isDraggingRef = ref(-1)
    const containerElSizeRef = ref(0)
    const panelSizes = ref<Array<string | number>>([])
    const triggerIndex = ref(-1)
    const dragStartPos = ref(0)

    // if (props.watchProps?.includes('defaultSize')) {
    //   watchEffect(() => (uncontrolledSizeRef.value = props.defaultSize))
    // }

    const convertSizeToPixel = (value: string | number): number => {
      if (typeof value === 'number') {
        return value * containerElSizeRef.value
      }
      if (typeof value === 'string') {
        if (value.endsWith('px')) {
          return Number.parseInt(value)
        }
        if (value === 'auto') {
          return (
            containerElSizeRef.value - convertSizeToPixel(panelSizes.value[0])
          )
        }
      }
      return 0
    }

    const mouseMoveEvent = 'mousemove'
    const mouseUpEvent = 'mouseup'
    const getMousePosition = (e: MouseEvent) =>
      e[props.direction === 'horizontal' ? 'clientX' : 'clientY']

    const onDraging = (e: MouseEvent) => {
      if (props.onDragMove)
        props.onDragMove(e)

      const currentPosition = getMousePosition(e)
      const mouseMoved = currentPosition - dragStartPos.value

      const aSize = panelSizes.value[triggerIndex.value]
      const bSize = panelSizes.value[triggerIndex.value + 1]

      const aSizeInPx = convertSizeToPixel(aSize)
      const bSizeInPx = convertSizeToPixel(bSize)

      let newASizeInPx = aSizeInPx + mouseMoved
      let newBSizeInPx = bSizeInPx - mouseMoved

      const minA = Array.isArray(props.min)
        ? convertSizeToPixel(props.min[triggerIndex.value] ?? 0)
        : convertSizeToPixel(props.min ?? 0)
      const minB = Array.isArray(props.min)
        ? convertSizeToPixel(props.min[triggerIndex.value + 1] ?? 0)
        : convertSizeToPixel(props.min ?? 0)

      const maxA = Array.isArray(props.max)
        ? convertSizeToPixel(props.max[triggerIndex.value] ?? 1)
        : convertSizeToPixel(props.max ?? 1)
      const maxB = Array.isArray(props.max)
        ? convertSizeToPixel(props.max[triggerIndex.value + 1] ?? 1)
        : convertSizeToPixel(props.max ?? 1)

      const snapOffset = props.snapOffset
      let snapped = false

      if (newASizeInPx < minA + snapOffset) {
        newASizeInPx = minA
        newBSizeInPx = aSizeInPx + bSizeInPx - minA
        snapped = true
      }
      else if (newBSizeInPx < minB + snapOffset) {
        newBSizeInPx = minB
        newASizeInPx = aSizeInPx + bSizeInPx - minB
        snapped = true
      }

      if (maxA !== 0 && newASizeInPx > maxA - snapOffset) {
        newASizeInPx = maxA
        newBSizeInPx = aSizeInPx + bSizeInPx - maxA
        snapped = true
      }
      else if (maxB !== 0 && newBSizeInPx > maxB - snapOffset) {
        newBSizeInPx = maxB
        newASizeInPx = aSizeInPx + bSizeInPx - maxB
        snapped = true
      }

      const halfSize = containerElSizeRef.value / 2
      if (Math.abs(newASizeInPx - halfSize) <= snapOffset) {
        newASizeInPx = halfSize
        newBSizeInPx = aSizeInPx + bSizeInPx - halfSize
        snapped = true
      }

      newASizeInPx = Math.max(
        minA,
        Math.min(maxA || containerElSizeRef.value, newASizeInPx)
      )
      newBSizeInPx = Math.max(
        minB,
        Math.min(maxB || containerElSizeRef.value, newBSizeInPx)
      )

      if (typeof aSize === 'number') {
        panelSizes.value[triggerIndex.value]
          = newASizeInPx / containerElSizeRef.value
      }
      else {
        panelSizes.value[triggerIndex.value] = `${newASizeInPx}px`
      }

      if (bSize === 'auto') {
        panelSizes.value[triggerIndex.value + 1] = `${newBSizeInPx}px`
      }
      else if (typeof bSize === 'number') {
        panelSizes.value[triggerIndex.value + 1]
          = newBSizeInPx / containerElSizeRef.value
      }
      else {
        panelSizes.value[triggerIndex.value + 1] = `${newBSizeInPx}px`
      }

      if (!snapped) {
        dragStartPos.value = currentPosition
      }
    }

    const onStopDrag = (e: MouseEvent) => {
      isDraggingRef.value = -1
      if (props.onDragEnd)
        props.onDragEnd(e)
      off(mouseMoveEvent, document, onDraging)
      off(mouseUpEvent, document, onStopDrag)
    }

    const handleOnMouseDown = (e: MouseEvent, index: number) => {
      e.preventDefault()
      if (props.onDragStart)
        props.onDragStart(e)
      triggerIndex.value = index
      isDraggingRef.value = index
      dragStartPos.value = getMousePosition(e)
      on(mouseMoveEvent, document, onDraging)
      on(mouseUpEvent, document, onStopDrag)
    }

    const getNumericSlotsLength = () =>
      Object.keys(slots).filter(key => /^\d+$/.test(key)).length

    const initializeSingleValue = (value: number | string) => {
      const panelSlotLength = getNumericSlotsLength()
      if (typeof value === 'number') {
        return [
          value,
          ...Array(panelSlotLength - 1).fill(
            (1 - value) / (panelSlotLength - 1)
          )
        ]
      }
      if (typeof value === 'string' && value.endsWith('px')) {
        return [value, ...Array(panelSlotLength - 1).fill('auto')]
      }
      return Array(panelSlotLength).fill(1 / panelSlotLength)
    }

    const initializeArrayValue = (value: Array<string | number>) => {
      const panelSlotLength = getNumericSlotsLength()
      return value.length >= panelSlotLength
        ? value.slice(0, panelSlotLength)
        : [
            ...value,
            ...Array(panelSlotLength - value.length).fill(1 / panelSlotLength)
          ]
    }

    const initializeSplit = () => {
      if (Array.isArray(props.size)) {
        panelSizes.value = initializeArrayValue(props.size)
      }
      else if (props.size !== undefined) {
        panelSizes.value = initializeSingleValue(props.size)
      }
      else if (Array.isArray(props.defaultSize)) {
        panelSizes.value = initializeArrayValue(props.defaultSize)
      }
      else if (props.defaultSize !== undefined) {
        panelSizes.value = initializeSingleValue(props.defaultSize)
      }
      else {
        const panelSlotLength = getNumericSlotsLength()
        panelSizes.value = Array(panelSlotLength).fill(1 / panelSlotLength)
      }
    }

    onMounted(() => {
      initializeSplit()
    })

    const getPanelStyle = (index: number) => {
      const size = panelSizes.value[index]
      const totalTriggerSize
        = (getNumericSlotsLength() - 1) * props.resizeTriggerSize
      const availableSpace
        = 100 - (totalTriggerSize / containerElSizeRef.value) * 100

      if (typeof size === 'number') {
        return {
          'flex-basis': `calc(${size * 100}% * ${availableSpace / 100})`,
          'flex-grow': '0',
          'flex-shrink': '0'
        }
      }

      if (typeof size === 'string') {
        if (size === 'auto') {
          return {
            'flex-basis': '0',
            'flex-grow': '1',
            'flex-shrink': '1'
          }
        }
        if (size.endsWith('px')) {
          const pxValue = Number.parseInt(size)
          return {
            'flex-basis': `calc(${pxValue}px * ${availableSpace / 100})`,
            'flex-grow': '0',
            'flex-shrink': '0'
          }
        }
      }

      return {
        'flex-basis': '0'
      }
    }

    const resizeTriggerStyle = computed(() => {
      if (isHorizontal) {
        return {
          width: `${props.resizeTriggerSize}px`,
          flexBasis: `${props.resizeTriggerSize}px`,
          cursor: 'col-resize'
        }
      }
      else {
        return {
          height: `${props.resizeTriggerSize}px`,
          flexBasis: `${props.resizeTriggerSize}px`,
          cursor: 'row-resize'
        }
      }
    })

    const onContainerResize = (e: ResizeObserverEntry) => {
      containerElSizeRef.value = isHorizontal
        ? e.contentRect.width
        : e.contentRect.height
    }

    // const resizeTriggerWrapperStyle = computed(() => {
    //   return {
    //     width: isHorizontal ? `${props.resizeTriggerSize}px` : '',
    //     height: isHorizontal ? '' : `${props.resizeTriggerSize}px`,
    //     cursor: isHorizontal ? 'col-resize' : 'row-resize'
    //   }
    // })

    return {
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      isDragging: isDraggingRef,
      mergedClsPrefix: mergedClsPrefixRef,
      resizeTriggerStyle,
      panelSizes,
      handleOnMouseDown,
      getPanelStyle,
      getNumericSlotsLength,
      onContainerResize
    }
  },
  render() {
    this.onRender?.()
    const {
      handleOnMouseDown,
      getPanelStyle,
      resizeTriggerStyle,
      getNumericSlotsLength,
      onContainerResize,
      $attrs,
      mergedClsPrefix,
      themeClass,
      isDragging,
      direction,
      $slots,
      cssVars
    } = this
    return (
      <VResizeObserver onResize={onContainerResize}>
        {{
          default: () => (
            <div
              {...$attrs}
              class={[
                $attrs.class,
                `${mergedClsPrefix}-split`,
                `${mergedClsPrefix}-split--${direction}`,
                themeClass
              ]}
              style={[$attrs.style as StyleValue, cssVars as CSSProperties]}
            >
              {Array.from({ length: getNumericSlotsLength() }).map(
                (_, index) => (
                  <Fragment key={index}>
                    <div
                      style={getPanelStyle(index)}
                      class={[`${mergedClsPrefix}-split-pane`]}
                    >
                      {$slots[`${index + 1}`]?.()}
                    </div>
                    {index < getNumericSlotsLength() - 1 && (
                      <div
                        class={[
                          `${mergedClsPrefix}-split__resize-trigger`,
                          isDragging === index
                          && `${mergedClsPrefix}-split__resize-trigger--hover`
                        ]}
                        style={resizeTriggerStyle}
                        onMousedown={e => handleOnMouseDown(e, index)}
                      />
                    )}
                  </Fragment>
                )
              )}
            </div>
          )
        }}
      </VResizeObserver>
    )
  }
})
