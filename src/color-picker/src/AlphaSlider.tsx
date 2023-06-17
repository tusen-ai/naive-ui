import { computed, defineComponent, h, type PropType, ref } from 'vue'
import { off, on } from 'evtd'
import { type RGBA, toRgbaString } from 'seemly'
import { normalizeAlpha } from './utils'

const HANDLE_SIZE = '12px'
const HANDLE_SIZE_NUM = 12
const RADIUS = '6px'

export default defineComponent({
  name: 'AlphaSlider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    rgba: {
      type: Array as unknown as PropType<RGBA | null>,
      default: null
    },
    alpha: {
      type: Number,
      default: 0
    },
    onUpdateAlpha: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onComplete: Function as PropType<() => void>
  },
  setup (props) {
    const railRef = ref<HTMLElement | null>(null)
    function handleMouseDown (e: MouseEvent): void {
      if (!railRef.value || !props.rgba) return
      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)
      handleMouseMove(e)
    }
    function handleMouseMove (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return
      const { width, left } = railEl.getBoundingClientRect()
      const newAlpha = (e.clientX - left) / (width - HANDLE_SIZE_NUM)
      props.onUpdateAlpha(normalizeAlpha(newAlpha))
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
      props.onComplete?.()
    }
    return {
      railRef,
      railBackgroundImage: computed(() => {
        const { rgba } = props
        if (!rgba) return ''
        return `linear-gradient(to right, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0) 0%, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1) 100%)`
      }),
      handleMouseDown
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={`${clsPrefix}-color-picker-slider`}
        ref="railRef"
        style={{
          height: HANDLE_SIZE,
          borderRadius: RADIUS
        }}
        onMousedown={this.handleMouseDown}
      >
        <div
          style={{
            borderRadius: RADIUS,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden'
          }}
        >
          <div class={`${clsPrefix}-color-picker-checkboard`} />
          <div
            class={`${clsPrefix}-color-picker-slider__image`}
            style={{
              backgroundImage: this.railBackgroundImage
            }}
          />
        </div>
        {this.rgba && (
          <div
            style={{
              position: 'absolute',
              left: RADIUS,
              right: RADIUS,
              top: 0,
              bottom: 0
            }}
          >
            <div
              class={`${clsPrefix}-color-picker-handle`}
              style={{
                left: `calc(${this.alpha * 100}% - ${RADIUS})`,
                borderRadius: RADIUS,
                width: HANDLE_SIZE,
                height: HANDLE_SIZE
              }}
            >
              <div
                class={`${clsPrefix}-color-picker-handle__fill`}
                style={{
                  backgroundColor: toRgbaString(this.rgba),
                  borderRadius: RADIUS,
                  width: HANDLE_SIZE,
                  height: HANDLE_SIZE
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
})
