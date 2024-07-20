const easeOut = (t: number): number => 1 - (1 - t) ** 5

// Tween
export interface TweenProps {
  from: number
  to: number
  duration: number
  onUpdate: (currentValue: number) => void
  onFinish: () => void
}

export function tween(props: TweenProps): void {
  const { from, to, duration, onUpdate, onFinish } = props
  const startTime = performance.now()
  const tick = (): void => {
    const current = performance.now()
    const elapsedTime = Math.min(current - startTime, duration)
    const currentValue = from + (to - from) * easeOut(elapsedTime / duration)
    if (elapsedTime === duration) {
      onFinish()
      return
    }
    onUpdate(currentValue)
    requestAnimationFrame(tick)
  }
  tick()
}
