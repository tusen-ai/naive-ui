import type { CSSProperties, PropType, Ref, SlotsType, VNode } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { SplitTheme, SplitThemeOverrides } from '../styles'
import type { SplitOnUpdateSize } from './types'
import { off, on } from 'evtd'
import { depx } from 'seemly'
import { useMergedState } from 'vooks'
import { computed, defineComponent, h, ref, toRef, watchEffect } from 'vue'
import { useTheme, useThemeClass } from '../../_mixins'
import useConfig from '../../_mixins/use-config'
import { call, resolveSlot } from '../../_utils'
import { splitLight } from '../styles'
import style from './styles/index.cssr'

export const splitProps = {
  ...(useTheme.props as ThemeProps<SplitTheme, SplitThemeOverrides>),
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

export interface SplitSlots {
  default?: () => VNode[]
  1?: () => VNode[]
  2?: () => VNode[]
  'resize-trigger'?: () => VNode[]
}

export default defineComponent({
  name: 'Split',
  props: splitProps,
  slots: Object as SlotsType<SplitSlots>,
  setup(props) {
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
    const doUpdateSize = (size: number | string): void => {
      const _onUpdateSize = props['onUpdate:size']
      if (props.onUpdateSize)
        call(props.onUpdateSize, size as string & number)
      if (_onUpdateSize)
        call(_onUpdateSize, size as string & number)
      uncontrolledSizeRef.value = size
    }
    const mergedSizeRef = useMergedState(controlledSizeRef, uncontrolledSizeRef)

    const firstPaneStyle = computed(() => {
      const sizeValue = mergedSizeRef.value
      if (typeof sizeValue === 'string') {
        return {
          flex: `0 0 ${sizeValue}`
        }
      }
      else if (typeof sizeValue === 'number') {
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
    function startDrag(e: MouseEvent | TouchEvent): void {
      const isTouch = 'touches' in e
      isDraggingRef.value = true
      if (props.onDragStart)
        props.onDragStart(e)
      const moveEvent = isTouch ? 'touchmove' : 'mousemove'
      const endEvents = isTouch ? ['touchend', 'touchcancel'] : ['mouseup']
      const onMove = (e: MouseEvent | TouchEvent): void => {
        updateSize(e)
        if (props.onDragMove)
          props.onDragMove(e)
      }
      const onEnd = (): void => {
        off(moveEvent, document, onMove)
        endEvents.forEach(name => off(name, document, onEnd))
        isDraggingRef.value = false
        if (props.onDragEnd)
          props.onDragEnd(e)
        document.body.style.cursor = ''
      }
      document.body.style.cursor = resizeTriggerWrapperStyle.value.cursor
      on(moveEvent, document, onMove)
      endEvents.forEach(name => on(name, document, onEnd))

      const resizeTriggerEl = resizeTriggerElRef.value
      if (resizeTriggerEl) {
        const elRect = resizeTriggerEl.getBoundingClientRect()
        const point = getPoint(e)
        if (props.direction === 'horizontal') {
          offset = point.clientX - elRect.left
        }
        else {
          offset = elRect.top - point.clientY
        }
      }
      updateSize(e)
    }

    const handleMouseDown = (e: MouseEvent): void => {
      e.preventDefault()
      startDrag(e)
    }

    const handleTouchStart = (e: TouchEvent): void => {
      // Prevent the browser from emulating mouse events after the touch
      if (e.cancelable)
        e.preventDefault()
      // Only a single finger drives the resizing
      if (e.touches.length !== 1)
        return
      startDrag(e)
    }

    function getPoint(event: MouseEvent | TouchEvent): {
      clientX: number
      clientY: number
    } {
      if ('touches' in event) {
        return event.touches[0] || event.changedTouches[0]
      }
      return event
    }

    function updateSize(event: MouseEvent | TouchEvent): void {
      const containerRect
        = resizeTriggerElRef.value?.parentElement?.getBoundingClientRect()
      if (!containerRect)
        return

      const { direction } = props

      const containerUsableWidth = containerRect.width - props.resizeTriggerSize
      const containerUsableHeight
        = containerRect.height - props.resizeTriggerSize
      const containerUsableSize
        = direction === 'horizontal'
          ? containerUsableWidth
          : containerUsableHeight

      const { clientX, clientY } = getPoint(event)
      const newPxSize
        = direction === 'horizontal'
          ? clientX - containerRect.left - offset
          : clientY - containerRect.top + offset

      const { min, max } = props

      const pxMin
        = typeof min === 'string' ? depx(min) : min * containerUsableSize
      const pxMax
        = typeof max === 'string' ? depx(max) : max * containerUsableSize

      let nextPxSize = newPxSize
      nextPxSize = Math.max(nextPxSize, pxMin)
      nextPxSize = Math.min(nextPxSize, pxMax, containerUsableSize)
      // in pixel mode
      if (typeof mergedSizeRef.value === 'string') {
        doUpdateSize(`${nextPxSize}px`)
      }
      else {
        // in percentage mode
        doUpdateSize(nextPxSize / containerUsableSize)
      }
    }

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('split', undefined, cssVarsRef, props)
      : undefined

    return {
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      cssVars: inlineThemeDisabled
        ? undefined
        : (cssVarsRef as Ref<CSSProperties>),
      resizeTriggerElRef,
      isDragging: isDraggingRef,
      mergedClsPrefix: mergedClsPrefixRef,
      resizeTriggerWrapperStyle,
      resizeTriggerStyle,
      handleMouseDown,
      handleTouchStart,
      firstPaneStyle
    }
  },
  render() {
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
          class={[`${this.mergedClsPrefix}-split-pane-1`, this.pane1Class]}
          style={[this.firstPaneStyle, this.pane1Style]}
        >
          {this.$slots[1]?.()}
        </div>
        {!this.disabled && (
          <div
            ref="resizeTriggerElRef"
            class={`${this.mergedClsPrefix}-split__resize-trigger-wrapper`}
            style={this.resizeTriggerWrapperStyle}
            onMousedown={this.handleMouseDown}
            onTouchstart={this.handleTouchStart}
          >
            {resolveSlot(this.$slots['resize-trigger'], () => [
              <div
                style={this.resizeTriggerStyle}
                class={[
                  `${this.mergedClsPrefix}-split__resize-trigger`,
                  this.isDragging
                  && `${this.mergedClsPrefix}-split__resize-trigger--hover`
                ]}
              >
              </div>
            ])}
          </div>
        )}
        <div
          class={[`${this.mergedClsPrefix}-split-pane-2`, this.pane2Class]}
          style={this.pane2Style}
        >
          {this.$slots[2]?.()}
        </div>
      </div>
    )
  }
})
