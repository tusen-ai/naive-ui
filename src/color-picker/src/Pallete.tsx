import type { HSVA } from 'seemly'
import { on, off } from 'evtd'
import { computed, defineComponent, h, type PropType, ref } from 'vue'

const HANDLE_SIZE = '12px'
const RADIUS = '6px'

export default defineComponent({
  name: 'Pallete',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    rgba: {
      type: Array as unknown as PropType<HSVA | null>,
      default: null
    },
    // 0 - 360
    displayedHue: {
      type: Number,
      required: true
    },
    displayedSv: {
      type: Array as unknown as PropType<[number, number]>,
      required: true
    },
    onUpdateSV: {
      type: Function as PropType<(s: number, v: number) => void>,
      required: true
    },
    onComplete: Function as PropType<() => void>
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
      const normalizedNewS = 100 * (newS > 1 ? 1 : newS < 0 ? 0 : newS)
      const normalizedNewV = 100 * (newV > 1 ? 1 : newV < 0 ? 0 : newV)
      props.onUpdateSV(normalizedNewS, normalizedNewV)
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
      props.onComplete?.()
    }
    return {
      palleteRef,
      handleColor: computed(() => {
        const { rgba } = props
        if (!rgba) return ''
        return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`
      }),
      handleMouseDown
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={`${clsPrefix}-color-picker-pallete`}
        onMousedown={this.handleMouseDown}
        ref="palleteRef"
      >
        <div
          class={`${clsPrefix}-color-picker-pallete__layer`}
          style={{
            backgroundImage: `linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`
          }}
        />
        <div
          class={`${clsPrefix}-color-picker-pallete__layer ${clsPrefix}-color-picker-pallete__layer--shadowed`}
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))'
          }}
        />
        {this.rgba && (
          <div
            class={`${clsPrefix}-color-picker-handle`}
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              borderRadius: RADIUS,
              left: `calc(${this.displayedSv[0]}% - ${RADIUS})`,
              bottom: `calc(${this.displayedSv[1]}% - ${RADIUS})`
            }}
          >
            <div
              class={`${clsPrefix}-color-picker-handle__fill`}
              style={{
                backgroundColor: this.handleColor,
                borderRadius: RADIUS,
                width: HANDLE_SIZE,
                height: HANDLE_SIZE
              }}
            />
          </div>
        )}
      </div>
    )
  }
})
