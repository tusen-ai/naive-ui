import { defineComponent, h, PropType, ref } from 'vue'
import { off, on } from 'evtd'

const HANDLE_SIZE = '12px'
const RADIUS = '6px'

const GRADIENT =
  'linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)'

export default defineComponent({
  name: 'HueSlider',
  props: {
    // 0 - 359
    hue: {
      type: Number,
      default: 0
    },
    onUpdateHue: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
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
      const newHue = Math.floor(((e.clientX - left) / width) * 360)
      props.onUpdateHue(newHue >= 360 ? 359 : newHue < 0 ? 0 : newHue)
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
    }
    return {
      railRef,
      handleMouseDown
    }
  },
  render () {
    return (
      <div
        class="n-hue-slider"
        style={{
          marginBottom: '8px'
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
              class="n-hue-slider__handle"
              draggable="false"
              style={{
                userSelect: 'none',
                position: 'absolute',
                boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 0px 1px',
                left: `calc((${this.hue}%) / 359 * 100 - ${RADIUS})`,
                boxSizing: 'border-box',
                border: '2px solid white',
                backgroundColor: `hsl(${this.hue}, 100%, 50%)`,
                borderRadius: RADIUS,
                width: HANDLE_SIZE,
                height: HANDLE_SIZE
              }}
            />
          </div>
        </div>
      </div>
    )
  }
})
