import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  PropType,
  watchEffect,
  VNodeChild,
  reactive
} from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'

const countdownProps = {
  label: String,
  duration: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  precision: {
    type: Number as PropType<0 | 1 | 2 | 3>,
    default: 0
  },
  render: Function as PropType<
  (props: {
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
  }) => VNodeChild
  >,
  onFinish: Function as PropType<() => void>
}

export type CountdownProps = ExtractPublicPropTypes<typeof countdownProps>

export default defineComponent({
  name: 'Countdown',
  props: countdownProps,
  setup (props) {
    let timerId: number | null = null
    let rafId: number | null = null
    let elapsed = 0
    let finished = false

    const timeInfo = reactive({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })

    deriveDisplayValue(props.duration)
    let pnow = -1

    function getDistance (time: DOMHighResTimeStamp): number {
      return props.duration - elapsed + pnow - time
    }

    function deriveDisplayValue (distance: number): void {
      const hours = Math.floor(distance / 3600000)
      const minutes = Math.floor((distance % 3600000) / 60000)
      const seconds = Math.floor((distance % 60000) / 1000)
      const milliseconds = Math.floor(distance % 1000)
      timeInfo.hours = hours
      timeInfo.minutes = minutes
      timeInfo.seconds = seconds
      timeInfo.milliseconds = milliseconds
    }

    function getDisplayValue (info: {
      hours: number
      minutes: number
      seconds: number
      milliseconds: number
    }): string {
      const { hours, minutes, seconds, milliseconds } = info
      const { precision } = props
      switch (precision) {
        case 0:
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        default:
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}.${String(
            Math.floor(
              milliseconds / (precision === 1 ? 100 : precision === 2 ? 10 : 1)
            )
          ).padStart(precision, '0')}`
      }
    }

    const frame = (): void => {
      const { precision } = props
      const distance = getDistance(performance.now())
      if (distance <= 0) {
        deriveDisplayValue(0)
        stopTimer()
        if (!finished) {
          props.onFinish?.()
          finished = true
        }
        return
      }
      let leftTime: number
      switch (precision) {
        case 3:
        case 2:
          leftTime = distance % 34 // about 30 fps
          break
        case 1:
          leftTime = distance % 100
          break
        default:
          leftTime = distance % 1000
      }
      deriveDisplayValue(distance)
      timerId = window.setTimeout(() => {
        frame()
      }, leftTime)
    }

    const stopTimer = (): void => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
        timerId = null
      }
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
        rafId = null
      }
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.active) {
          pnow = performance.now()
          frame()
        } else {
          const now = performance.now()
          if (pnow !== -1) {
            elapsed += now - pnow
          }
          stopTimer()
        }
      })
    })
    onBeforeUnmount(() => {
      stopTimer()
    })
    return () => {
      const { render } = props
      if (render) {
        return render(timeInfo)
      } else {
        return getDisplayValue(timeInfo)
      }
    }
  }
})
