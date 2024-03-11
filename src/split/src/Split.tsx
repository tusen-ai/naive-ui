import {
  h,
  defineComponent,
  type PropType,
  ref,
  computed,
  type CSSProperties,
  watchEffect,
  toRef
} from 'vue'
import { off, on } from 'evtd'
import { useMergedState } from 'vooks'
import { type ExtractPublicPropTypes, resolveSlot, call } from '../../_utils'
import useConfig from '../../_mixins/use-config'
import { type ThemeProps, useTheme, useThemeClass } from '../../_mixins'
import style from './styles/index.cssr'
import { type SplitTheme, splitLight } from '../styles'
import { type SplitOnUpdateSize } from './types'

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
    type: [String, Number] as PropType<string | number>,
    default: 0.5
  },
  'onUpdate:size': [Function, Array] as PropType<
  SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  onUpdateSize: [Function, Array] as PropType<
  SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  size: [String, Number] as PropType<string | number>,
  min: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  max: {
    type: [String, Number] as PropType<string | number>,
    default: 1
  },
  panel1Class: String,
  panel1Style: [Object, String] as PropType<CSSProperties | string>,
  panel2Class: String,
  panel2Style: [Object, String] as PropType<CSSProperties | string>,
  onDragStart: Function as PropType<(e: Event) => void>,
  onDragMove: Function as PropType<(e: Event) => void>,
  onDragEnd: Function as PropType<(e: Event) => void>,
  watchProps: Array as PropType<Array<'defaultSize'>>
} as const

export type SplitProps = ExtractPublicPropTypes<typeof splitProps>

export default defineComponent({
  name: 'Split',
  props: splitProps,
  setup (props) {
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
    const resizeTriggerElRef = ref<HTMLElement | null>(null)
    const isDraggingRef = ref(false)
    const controlledSizeRef = toRef(props, 'size')
    const uncontrolledSizeRef = ref(props.defaultSize)
    if (props.watchProps?.includes('defaultSize')) {
      watchEffect(() => (uncontrolledSizeRef.value = props.defaultSize))
    }
    // use to update controlled or uncontrolled values
    const doUpdateSize = (size: number, containerSize: number): void => {
      const sizeValue =
        typeof props.size === 'string' ? `${size * containerSize}px` : size
      const _onUpdateSize = props['onUpdate:size']
      if (props.onUpdateSize) call(props.onUpdateSize, sizeValue)
      if (_onUpdateSize) call(_onUpdateSize, sizeValue)
      uncontrolledSizeRef.value = size
    }
    const mergedSizeRef = useMergedState(controlledSizeRef, uncontrolledSizeRef)

    const isPixel = computed(() => typeof mergedSizeRef.value === 'string')

    const firstPaneStyle = computed(() => {
      const sizeValue = mergedSizeRef.value
      if (isPixel.value) {
        const size = parseFloat(sizeValue as string)
        return {
          flex: `0 0 ${size}px`
        }
      } else if (typeof sizeValue === 'number') {
        const size = sizeValue * 100
        return {
          flex: `0 0 calc(${size}% - ${
            (props.resizeTriggerSize * size) / 100
          }px)`
        }
      }
    })

    const resizeTriggerStyle = computed(() => {
      return props.direction === 'horizontal'
        ? {
            width: `${props.resizeTriggerSize}px`,
            height: '100%'
          }
        : {
            width: '100%',
            height: `${props.resizeTriggerSize}px`
          }
    })

    const resizeTriggerWrapperStyle = computed(() => {
      const horizontal = props.direction === 'horizontal'
      return {
        width: horizontal ? `${props.resizeTriggerSize}px` : '',
        height: horizontal ? '' : `${props.resizeTriggerSize}px`,
        cursor: props.direction === 'horizontal' ? 'col-resize' : 'row-resize'
      }
    })

    let offset = 0
    const handleMouseDown = (e: MouseEvent): void => {
      e.preventDefault()
      isDraggingRef.value = true
      if (props.onDragStart) props.onDragStart(e)
      const mouseMoveEvent = 'mousemove'
      const mouseUpEvent = 'mouseup'
      const onMouseMove = (e: MouseEvent): void => {
        updateSize(e)
        if (props.onDragMove) props.onDragMove(e)
      }
      const onMouseUp = (): void => {
        off(mouseMoveEvent, document, onMouseMove)
        off(mouseUpEvent, document, onMouseUp)
        isDraggingRef.value = false
        if (props.onDragEnd) props.onDragEnd(e)
        document.body.style.cursor = ''
      }
      document.body.style.cursor = resizeTriggerWrapperStyle.value.cursor
      on(mouseMoveEvent, document, onMouseMove)
      on(mouseUpEvent, document, onMouseUp)

      const resizeTriggerEl = resizeTriggerElRef.value
      if (resizeTriggerEl) {
        const elRect = resizeTriggerEl.getBoundingClientRect()
        if (props.direction === 'horizontal') {
          offset = e.clientX - elRect.left
        } else {
          offset = elRect.top - e.clientY
        }
      }
      updateSize(e)
    }

    const parseSizeValue = (
      value: string | number,
      parentSize: number
    ): number => {
      if (typeof value === 'string' && value.endsWith('px')) {
        return parseFloat(value) / parentSize
      } else {
        const numericValue = value as number
        return numericValue >= 0 && numericValue <= 1
          ? numericValue
          : numericValue / 100
      }
    }

    const updateSize = (event: MouseEvent): void => {
      const parentRect =
        resizeTriggerElRef.value?.parentElement?.getBoundingClientRect()
      if (!parentRect) return

      const newSize =
        props.direction === 'horizontal'
          ? (event.clientX - parentRect.left - offset) /
            (parentRect.width - props.resizeTriggerSize)
          : (event.clientY - parentRect.top + offset) /
            (parentRect.height - props.resizeTriggerSize)
      const containerSize =
        props.direction === 'horizontal' ? parentRect.width : parentRect.height
      const min = parseSizeValue(props.min, containerSize)
      const max = parseSizeValue(props.max, containerSize)
      let nextSize = newSize
      if (props.min) {
        nextSize = Math.max(newSize, min)
      }
      if (props.max) {
        nextSize = Math.min(nextSize, max)
      }
      doUpdateSize(nextSize, containerSize)
    }

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('split', undefined, cssVarsRef, props)
      : undefined

    return {
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      resizeTriggerElRef,
      isDragging: isDraggingRef,
      mergedClsPrefix: mergedClsPrefixRef,
      resizeTriggerWrapperStyle,
      resizeTriggerStyle,
      handleMouseDown,
      firstPaneStyle
    }
  },
  render () {
    this.onRender?.()
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-split`,
          `${this.mergedClsPrefix}-split--${this.direction}`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[`${this.mergedClsPrefix}-split-pane-1`, this.panel1Class]}
          style={[this.firstPaneStyle, this.panel1Style]}
        >
          {this.$slots[1]?.()}
        </div>
        {!this.disabled && (
          <div
            ref="resizeTriggerElRef"
            class={`${this.mergedClsPrefix}-split__resize-trigger-wrapper`}
            style={this.resizeTriggerWrapperStyle}
            onMousedown={this.handleMouseDown}
          >
            {resolveSlot(this.$slots['resize-trigger'], () => [
              <div
                style={this.resizeTriggerStyle}
                class={[
                  `${this.mergedClsPrefix}-split__resize-trigger`,
                  this.isDragging &&
                    `${this.mergedClsPrefix}-split__resize-trigger--hover`
                ]}
              ></div>
            ])}
          </div>
        )}
        <div
          class={[`${this.mergedClsPrefix}-split-pane-2`, this.panel2Class]}
          style={this.panel2Style}
        >
          {this.$slots[2]?.()}
        </div>
      </div>
    )
  }
})
