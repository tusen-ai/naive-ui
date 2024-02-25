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
import { type ExtractPublicPropTypes, resolveSlot, call } from '../../_utils'
import useConfig from '../../_mixins/use-config'
import style from './styles/index.cssr'
import { type ThemeProps, useTheme, useThemeClass } from '../../_mixins'
import { type SplitTheme, splitLight } from '../styles'
import { useMergedState } from 'vooks'
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
    type: Number,
    default: 0.5
  },
  'onUpdate:size': [Function, Array] as PropType<
  SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  onUpdateSize: [Function, Array] as PropType<
  SplitOnUpdateSize | SplitOnUpdateSize[]
  >,
  size: Number,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1
  },
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

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'split',
        undefined,
        cssVarsRef,
        props
      )
      : undefined

    const resizeTriggerElRef = ref<HTMLElement | null>(null)
    const isDraggingRef = ref(false)
    const controlledSizeRef = toRef(props, 'size')
    const uncontrolledSizeRef = ref(props.defaultSize)
    if (props.watchProps?.includes('defaultSize')) {
      watchEffect(() => (uncontrolledSizeRef.value = props.defaultSize))
    }
    // use to update controlled or uncontrolled values
    const doUpdateSize = (size: number): void => {
      const _onUpdateSize = props['onUpdate:size']
      if (props.onUpdateSize) call(props.onUpdateSize, size)
      if (_onUpdateSize) call(_onUpdateSize, size)
      uncontrolledSizeRef.value = size
    }
    const mergedSizeRef = useMergedState(controlledSizeRef, uncontrolledSizeRef)
    const firstPaneStyle = computed(() => {
      const size = mergedSizeRef.value * 100
      return {
        flex: `0 0 calc(${size}% - ${(props.resizeTriggerSize * size) / 100}px)`
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
      let nextSize = newSize
      if (props.min) {
        nextSize = Math.max(newSize, props.min)
      }
      if (props.max) {
        nextSize = Math.min(nextSize, props.max)
      }
      doUpdateSize(nextSize)
    }

    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      resizeTriggerElRef,
      isDragging: isDraggingRef,
      mergedClsPrefix: mergedClsPrefixRef,
      resizeTriggerWrapperStyle,
      resizeTriggerStyle,
      handleMouseDown,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      firstPaneStyle
    }
  },
  render () {
    const { themeClass, onRender } = this
    onRender?.()
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-split`,
          themeClass,
          `${this.mergedClsPrefix}-split--${this.direction}`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${this.mergedClsPrefix}-split-pane-1`}
          style={this.firstPaneStyle}
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
        <div class={`${this.mergedClsPrefix}-split-pane-2`}>
          {this.$slots[2]?.()}
        </div>
      </div>
    )
  }
})
