import { defineComponent, h, type PropType, ref } from 'vue'
import { off, on } from 'evtd'
import { normalizeHue } from './utils'

const HANDLE_SIZE = '12px'
const HANDLE_SIZE_NUM = 12
const RADIUS = '6px'
const RADIUS_NUM = 6

const GRADIENT =
  'linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)'

export default defineComponent({
  name: 'HueSlider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    hue: {
      type: Number,
      required: true
    },
    onUpdateHue: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onComplete: Function as PropType<() => void>
  },
  setup (props) {
    const railRef = ref<HTMLElement | null>(null)
    function handleMouseDown (e: MouseEvent): void {
      if (!railRef.value) return
      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)
      handleMouseMove(e)
    }
    function handleMouseMove (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return
      const { width, left } = railEl.getBoundingClientRect()
      const newHue = normalizeHue(
        ((e.clientX - left - RADIUS_NUM) / (width - HANDLE_SIZE_NUM)) * 360
      )
      props.onUpdateHue(newHue)
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
      props.onComplete?.()
    }
    return {
      railRef,
      handleMouseDown
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={`${clsPrefix}-color-picker-slider`}
        style={{
          height: HANDLE_SIZE,
          borderRadius: RADIUS
        }}
      >
        <div
          ref="railRef"
          style={{
            boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, .24)',
            boxSizing: 'border-box',
            backgroundImage: GRADIENT,
            height: HANDLE_SIZE,
            borderRadius: RADIUS,
            position: 'relative'
          }}
          onMousedown={this.handleMouseDown}
        >
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
                left: `calc((${this.hue}%) / 359 * 100 - ${RADIUS})`,
                borderRadius: RADIUS,
                width: HANDLE_SIZE,
                height: HANDLE_SIZE
              }}
            >
              <div
                class={`${clsPrefix}-color-picker-handle__fill`}
                style={{
                  backgroundColor: `hsl(${this.hue}, 100%, 50%)`,
                  borderRadius: RADIUS,
                  width: HANDLE_SIZE,
                  height: HANDLE_SIZE
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
