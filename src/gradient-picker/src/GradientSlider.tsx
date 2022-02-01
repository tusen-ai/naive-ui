import { defineComponent, PropType, h, ref } from 'vue'
import type { GradientColor } from './interface'
import { off, on } from 'evtd'
import { normalizeOffset, generateGradientCss } from './utils'

const HANDLE_SIZE = '12px'
const HANDLE_SIZE_NUM = 12
const RADIUS = '6px'
const RADIUS_NUM = 6

export default defineComponent({
  name: 'GradientSlider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: Object as PropType<GradientColor>,
      required: true
    },
    activeStop: Number,
    onUpdateActiveStop: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onUpdateStopOffset: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onAddStop: {
      type: Function as PropType<(value: number) => void>,
      required: true
    },
    onRemoveStop: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
  },
  setup (props) {
    const railRef = ref<HTMLElement | null>(null)

    // 鼠标修改节点偏移 0 - 100
    function handleMouseDown (e: MouseEvent, index: number): void {
      const { value: railEl } = railRef
      if (!railEl) return

      props.onUpdateActiveStop(index)

      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)

      handleMouseMove(e)
    }

    function handleMouseMove (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return

      const { width, left } = railEl.getBoundingClientRect()
      const newOffset = normalizeOffset(
        (e.clientX - left - RADIUS_NUM) / (width - HANDLE_SIZE_NUM)
      )
      props.onUpdateStopOffset(newOffset)
    }

    function handleMouseUp (_: MouseEvent): void {
      // props.onComplete?.()
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
    }

    // 点击滑轨 -> 添加节点
    function handleClickRail (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return

      const { width, left } = railEl.getBoundingClientRect()
      const newOffset = normalizeOffset(
        (e.clientX - left - RADIUS_NUM) / (width - HANDLE_SIZE_NUM)
      )
      props.onAddStop(newOffset)
    }

    return {
      railRef,
      handleMouseDown,
      handleClickRail
    }
  },
  render () {
    const { clsPrefix, activeStop, onRemoveStop } = this
    const { stops } = this.value.gradient

    return (
      <div
        class={`${clsPrefix}-gradient-picker-slider`}
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
            backgroundImage: generateGradientCss(stops, 'linear-gradient', 90),
            height: HANDLE_SIZE,
            borderRadius: RADIUS,
            position: 'relative'
          }}
          onClick={this.handleClickRail}
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
            {stops.map((stop, index) => (
              <div
                class={`${clsPrefix}-gradient-picker-handle`}
                style={{
                  left: `calc(${stop.offset * 100}% - ${RADIUS})`,
                  borderRadius: RADIUS,
                  width: HANDLE_SIZE,
                  height: HANDLE_SIZE
                }}
                key={index}
                onMousedown={(e) => this.handleMouseDown(e, index)}
                onClick={(e) => e.stopPropagation()}
                onDblclick={() => onRemoveStop(index)}
              >
                <div
                  class={`${clsPrefix}-gradient-picker-handle__fill`}
                  style={{
                    backgroundColor: stop.color,
                    borderRadius: RADIUS,
                    width: HANDLE_SIZE,
                    height: HANDLE_SIZE
                  }}
                >
                  <span
                    class={`${clsPrefix}-gradient-stop`}
                    style={{ opacity: activeStop === index ? 1 : 0 }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
})
