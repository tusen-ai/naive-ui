import { HSVA } from 'seemly'
import { on, off } from 'evtd'
import { computed, defineComponent, h, PropType, ref } from 'vue'

const HANDLE_SIZE = '12px'
const RADIUS = '6px'

export default defineComponent({
  name: 'Pallete',
  props: {
    // 360, 100, 100
    hsva: {
      type: (Array as unknown) as PropType<HSVA | null>,
      default: null
    },
    // 0 - 360
    displayedHue: {
      type: Number,
      required: true
    },
    onUpdateSV: {
      type: Function as PropType<(s: number, v: number) => void>,
      required: true
    }
  },
  setup (props) {
    const palleteRef = ref<HTMLElement | null>(null)
    function handleMouseDown (e: MouseEvent): void {
      if (!palleteRef.value) return
      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)
      handleMouseMove(e)
    }
    function handleMouseMove (e: MouseEvent): void {
      const { value: palleteEl } = palleteRef
      if (!palleteEl) return
      const { width, height, left, bottom } = palleteEl.getBoundingClientRect()
      const newV = (bottom - e.clientY) / height
      const newS = (e.clientX - left) / width

      props.onUpdateSV(
        100 * (newS > 100 ? 1 : newS < 0 ? 0 : newS),
        100 * (newV > 100 ? 1 : newV < 0 ? 0 : newV)
      )
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
    }
    return {
      palleteRef,
      handleColor: computed(() => {
        // const [r, g, b] = hsv2rgb(props.hue, props.s, props.v)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        // return `rgb(${r}, ${g}, ${b})`
        return 'transparent'
      }),
      handleMouseDown
    }
  },
  render () {
    return (
      <div
        style="height: 300px; position: relative;"
        onMousedown={this.handleMouseDown}
        ref="palleteRef"
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            backgroundImage: `linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))'
          }}
        />
        {this.hsva && (
          <div
            style={{
              userSelect: 'none',
              width: HANDLE_SIZE,
              backgroundColor: this.handleColor,
              height: HANDLE_SIZE,
              borderRadius: RADIUS,
              boxSizing: 'border-box',
              border: '2px solid white',
              position: 'absolute',
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              left: `calc(${this.hsva[1]}% - ${RADIUS})`,
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              bottom: `calc(${this.hsva[2]}% - ${RADIUS})`
            }}
          />
        )}
      </div>
    )
  }
})
