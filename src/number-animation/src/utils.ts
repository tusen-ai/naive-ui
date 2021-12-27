const easingout = (power: number, t: number): number =>
  1 - Math.abs(Math.pow(t - 1, power))
// Tween
export interface TweenProps {
  from: number
  to: number
  duration?: number
  delay?: number
  onStart?: (currentValue: number) => void
  onUpdate: (currentValue: number) => void
  onFinish: () => void
}

export function tween (props: TweenProps): void {
  const {
    from,
    to,
    duration = 500,
    delay = 0,
    onStart,
    onUpdate,
    onFinish
  } = props
  const startTime = Date.now() + delay
  const started = false
  let finished = false
  let timerId: number | null = null
  let currentValue = from
  const update = (): void => {
    const current = Date.now()
    let elapsedTime = current - startTime
    elapsedTime = elapsedTime > duration ? duration : elapsedTime
    currentValue = from + (to - from) * easingout(2, elapsedTime / duration)

    if (elapsedTime === duration) {
      if (!finished) {
        finished = true
        onFinish()
      }
      return
    }

    if (current < startTime || finished) return
    if (!started) {
      onStart?.(currentValue)
    }
    onUpdate(currentValue)
  }
  const start = (): void => {
    const tick = (): void => {
      update()
      timerId = requestAnimationFrame(tick)
      if (finished) {
        cancelAnimationFrame(timerId)
        timerId = null
      }
    }
    tick()
  }
  start()
}
