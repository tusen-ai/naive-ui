import {
  h,
  defineComponent,
  type PropType,
  ref,
  computed,
  type CSSProperties
} from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import useConfig from '../../_mixins/use-config'
import style from './styles/index.cssr'
import { type ThemeProps, useTheme } from '../../_mixins'
import { type SplitTheme, splitLight } from '../styles'
import { onMounted } from 'vue'

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
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 0.5
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 1
  },
  onMoveStart: Function as PropType<(e: Event) => void>,
  onMoving: Function as PropType<(e: Event) => void>,
  onMoveEnd: Function as PropType<(e: Event) => void>
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
        self: { resizableTriggerColorHover }
      } = themeRef.value
      return {
        '--n-resize-trigger-color-hover': resizableTriggerColorHover
      }
    })

    const dividerRef = ref<HTMLElement | null>(null)
    const isDraggingRef = ref(false)
    const currentSize = ref(props.size)
    const triggerSize = ref(0)

    onMounted(() => {
      if (!dividerRef.value) return
      const { width, height } = dividerRef.value.getBoundingClientRect()
      triggerSize.value = props.direction === 'horizontal' ? width : height
    })

    const firstPaneStyle = computed(() => {
      const size = currentSize.value * 100
      return {
        flex: `0 0 calc(${size}% - ${triggerSize.value}px)`
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

    const handleMouseDown = (e: MouseEvent): void => {
      e.preventDefault()
      isDraggingRef.value = true
      if (props.onMoveStart) props.onMoveStart(e)
      const mouseMoveEvent = 'mousemove'
      const mouseUpEvent = 'mouseup'
      const onMouseMove = (e: MouseEvent): void => {
        updateSize(e)
        if (props.onMoving) props.onMoving(e)
      }
      const onMouseUp = (): void => {
        document.removeEventListener(mouseMoveEvent, onMouseMove)
        document.removeEventListener(mouseUpEvent, onMouseUp)
        isDraggingRef.value = false
        if (props.onMoveEnd) props.onMoveEnd(e)
      }
      document.addEventListener(mouseMoveEvent, onMouseMove)
      document.addEventListener(mouseUpEvent, onMouseUp)
    }

    const updateSize = (event: MouseEvent): void => {
      const parentRect =
        dividerRef.value?.parentElement?.getBoundingClientRect()
      if (!parentRect) return
      const newSize =
        props.direction === 'horizontal'
          ? (event.clientX - parentRect.left) / parentRect.width
          : (event.clientY - parentRect.top) / parentRect.height
      currentSize.value = newSize
      if (props.min) {
        currentSize.value = Math.max(newSize, props.min)
      }
      if (props.max) {
        currentSize.value = Math.min(newSize, props.max)
      }
    }

    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      divider: dividerRef,
      isDragging: isDraggingRef,
      mergedClsPrefix: mergedClsPrefixRef,
      resizeTriggerStyle,
      handleMouseDown,
      firstPaneStyle
    }
  },
  render () {
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-split`,
          `${this.mergedClsPrefix}-split--${this.direction}`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${this.mergedClsPrefix}-split-pane`}
          style={this.firstPaneStyle}
        >
          {this.$slots.first?.()}
        </div>

        {!this.disabled && (
          <div
            ref="divider"
            class={[`${this.mergedClsPrefix}-split__resize-trigger-wrapper`]}
            onMousedown={this.handleMouseDown}
          >
            {this.$slots['resize-trigger']?.() ?? (
              <div
                style={this.resizeTriggerStyle}
                class={[
                  `${this.mergedClsPrefix}-split__resize-trigger`,
                  this.isDragging &&
                    `${this.mergedClsPrefix}-split__resize-trigger--hover`
                ]}
              >
                {' '}
              </div>
            )}
          </div>
        )}
        <div
          class={[
            `${this.mergedClsPrefix}-split-pane`,
            `${this.mergedClsPrefix}-split-second-pane`
          ]}
        >
          {this.$slots.second?.()}
        </div>
      </div>
    )
  }
})
