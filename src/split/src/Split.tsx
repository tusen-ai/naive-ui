import { h, defineComponent, type PropType, ref, computed } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useMergedClsPrefix } from '../../_mixins/use-config'
import style from './styles/index.cssr'
import { type ThemeProps, useTheme } from '../../_mixins'
import { type SplitTheme, splitLight } from '../styles'

export const splitProps = {
  ...(useTheme.props as ThemeProps<SplitTheme>),
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  barSize: {
    type: Number,
    default: 3
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
  }
} as const

export type SplitProps = ExtractPublicPropTypes<typeof splitProps>

export default defineComponent({
  name: 'Split',
  props: splitProps,
  setup (props) {
    const mergedClsPrefixRef = useMergedClsPrefix()

    useTheme('Split', '-split', style, splitLight, props, mergedClsPrefixRef)

    const dividerRef = ref<HTMLElement | null>(null)
    const currentSize = ref(props.size)

    const firstPaneStyle = computed(() => {
      const size = currentSize.value * 100
      return {
        flex: `0 0 calc(${size}% - ${props.barSize}px)`
      }
    })

    const resizeTriggerStyle = computed(() => {
      return props.direction === 'horizontal'
        ? {
            width: `${props.barSize}px`,
            height: '100%'
          }
        : {
            width: '100%',
            height: `${props.barSize}px`
          }
    })

    const startDragging = (event: MouseEvent): void => {
      if (event.target !== dividerRef.value) return
      event.preventDefault()
      const mouseMoveEvent = 'mousemove'
      const mouseUpEvent = 'mouseup'
      const onMouseMove = (e: MouseEvent): void => {
        updateSize(e)
      }
      const onMouseUp = (): void => {
        document.removeEventListener(mouseMoveEvent, onMouseMove)
        document.removeEventListener(mouseUpEvent, onMouseUp)
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
      dividerRef,
      mergedClsPrefixRef,
      resizeTriggerStyle,
      startDragging,
      firstPaneStyle
    }
  },
  render () {
    return (
      <div
        class={[
          `${this.mergedClsPrefixRef}-split`,
          `${this.mergedClsPrefixRef}-split--${this.direction}`
        ]}
        onMousedown={this.startDragging}
      >
        <div
          class={`${this.mergedClsPrefixRef}-split-pane`}
          style={this.firstPaneStyle}
        >
          {this.$slots.first?.()}
        </div>
        <div
          ref="dividerRef"
          class={`${this.mergedClsPrefixRef}-split__resize-trigger`}
          style={this.resizeTriggerStyle}
        />
        <div
          class={[
            `${this.mergedClsPrefixRef}-split-pane`,
            `${this.mergedClsPrefixRef}-split-second-pane`
          ]}
        >
          {this.$slots.second?.()}
        </div>
      </div>
    )
  }
})
