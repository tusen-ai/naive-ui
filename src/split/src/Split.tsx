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
    const isDraggingRef = ref(false)
    const containerElSizeRef = ref(0)
    const panelSizes = ref<number[]>([])
    const triggerIndex = ref(-1)
    const dragStartPos = ref(0)

    // if (props.watchProps?.includes('defaultSize')) {
    //   watchEffect(() => (uncontrolledSizeRef.value = props.defaultSize))
    // }

    const convertToPercentage = (value: number | string): number => {
      if (typeof value === 'number') {
        return value
      }
      if (typeof value === 'string' && value.endsWith('px')) {
        return Number.parseInt(value) / containerElSizeRef.value
      }
      return 0
    }

    const mouseMoveEvent = 'mousemove'
    const mouseUpEvent = 'mouseup'
    const getMousePosition = (e: MouseEvent | TouchEvent) => {
      const clientAxis
        = props.direction === 'horizontal' ? 'clientX' : 'clientY'
      if ('touches' in e)
        return e.touches[0][clientAxis]
      return e[clientAxis]
    }

    const onDraging = (e: MouseEvent | TouchEvent) => {
      if (isDraggingRef.value)
        return

      const currentPosition = getMousePosition(e)
      const mouseMoved = currentPosition - dragStartPos.value
      const percentageMoved = mouseMoved / containerElSizeRef.value

      const aSize = panelSizes.value[triggerIndex.value]
      const bSize = panelSizes.value[triggerIndex.value + 1]

      let newASize = aSize + percentageMoved
      let newBSize = bSize - percentageMoved

      const minSizeA = Array.isArray(props.min)
        ? convertToPercentage(props.min[triggerIndex.value] ?? 0)
        : convertToPercentage(props.min ?? 0)
      const minSizeB = Array.isArray(props.min)
        ? convertToPercentage(props.min[triggerIndex.value + 1] ?? 0)
        : convertToPercentage(props.min ?? 0)

      const maxSizeA = Array.isArray(props.max)
        ? convertToPercentage(props.max[triggerIndex.value] ?? 1)
        : convertToPercentage(props.max ?? 1)
      const maxSizeB = Array.isArray(props.max)
        ? convertToPercentage(props.max[triggerIndex.value + 1] ?? 1)
        : convertToPercentage(props.max ?? 1)

      const snapOffset = props.snapOffset / containerElSizeRef.value
      let snapped = false

      // 检查最小值约束
      if (newASize < minSizeA + snapOffset) {
        newASize = minSizeA
        newBSize = aSize + bSize - minSizeA
        snapped = true
      }
      else if (newBSize < minSizeB + snapOffset) {
        newBSize = minSizeB
        newASize = aSize + bSize - minSizeB
        snapped = true
      }

      // 检查最大值约束
      if (minSizeA !== 0 && newASize > maxSizeA - snapOffset) {
        newASize = maxSizeA
        newBSize = aSize + bSize - maxSizeA
        snapped = true
      }
      else if (minSizeB !== 0 && newBSize > maxSizeB - snapOffset) {
        newBSize = maxSizeB
        newASize = aSize + bSize - maxSizeB
        snapped = true
      }

      if (
        newASize >= minSizeA
        && newBSize >= minSizeB
        && (minSizeA === 0 || newASize <= maxSizeA)
        && (minSizeB === 0 || newBSize <= maxSizeB)
      ) {
        panelSizes.value[triggerIndex.value] = newASize
        panelSizes.value[triggerIndex.value + 1] = newBSize

        if (!snapped) {
          dragStartPos.value = currentPosition
        }
      }
    }

    const onStopDrag = () => {
      isDraggingRef.value = false
      off(mouseMoveEvent, document, onDraging)
      off(mouseUpEvent, document, onStopDrag)
    }

    const handleOnMouseDown = (
      e: MouseEvent | TouchEvent,
      gutterIndex: number
    ) => {
      e.preventDefault()
      triggerIndex.value = gutterIndex
      dragStartPos.value = getMousePosition(e)
      on(mouseMoveEvent, document, onDraging)
      on(mouseUpEvent, document, onStopDrag)
    }

    const getNumericSlotsLength = () =>
      Object.keys(slots).filter(key => /^\d+$/.test(key)).length

    const initializeSingleValue = (value: number | string) => {
      const panelSlotLength = getNumericSlotsLength()
      const percentage = convertToPercentage(value)
      return [
        percentage,
        ...Array(panelSlotLength - 1).fill(
          (1 - percentage) / (panelSlotLength - 1)
        )
      ]
    }

    const initializeArrayValue = (value: (number | string)[]) => {
      const panelSlotLength = getNumericSlotsLength()
      const percentages = value.map(v => convertToPercentage(v))
      return percentages.length >= panelSlotLength
        ? percentages.slice(0, panelSlotLength)
        : [
            ...percentages,
            ...Array(panelSlotLength - percentages.length).fill(
              1 / panelSlotLength
            )
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
      return {
        'flex-basis': `calc(${size * 100}% * ${availableSpace / 100})`
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
                          isDragging
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
