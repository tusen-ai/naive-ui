import { computed, defineComponent, h, PropType, ref } from 'vue'
import { off, on } from 'evtd'
import { RGBA, toRgbaString } from 'seemly'
import { normalizeAlpha } from './utils'

const HANDLE_SIZE = '12px'
const RADIUS = '6px'

export default defineComponent({
  name: 'AlphaSlider',
  props: {
    rgba: {
      type: (Array as unknown) as PropType<RGBA | null>,
      default: null
    },
    alpha: {
      type: Number,
      default: 0
    },
    onUpdateAlpha: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
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
      const newAlpha = (e.clientX - left) / width
      props.onUpdateAlpha(normalizeAlpha(newAlpha))
    }
    function handleMouseUp (): void {
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
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
    return (
      <div
        class="n-color-picker-slider"
        style={{
          marginBottom: '8px'
        }}
      >
        <div
          ref="railRef"
          style={{
            boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, .24)',
            boxSizing: 'border-box',
            height: HANDLE_SIZE,
            borderRadius: RADIUS,
            position: 'relative'
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
            <div
              style={{
                height: '6px',
                backgroundImage:
                  'linear-gradient(to right,#eee 6px,transparent 6px)',
                backgroundSize: '12px 6px',
                backgroundRepeat: 'repeat'
              }}
            ></div>
            <div
              style={{
                position: 'relative',
                right: '-6px',
                height: '6px',
                backgroundImage:
                  'linear-gradient(to right,#eee 6px,transparent 6px)',
                backgroundSize: '12px 6px',
                backgroundRepeat: 'repeat'
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
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
                class="n-color-picker-handler n-color-picker-handler--alpha"
                style={{
                  position: 'absolute',
                  left: `calc(${this.alpha * 100}% - ${RADIUS})`,
                  boxSizing: 'border-box',
                  border: '2px solid white',
                  backgroundColor: toRgbaString(this.rgba),
                  borderRadius: RADIUS,
                  width: HANDLE_SIZE,
                  height: HANDLE_SIZE
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
})
