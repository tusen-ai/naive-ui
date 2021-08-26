import { Ref } from 'vue'
import { createId } from 'seemly'

const changeProcessingFillStrokeDasharray = ({
  processingFillStrokeDasharrayRef,
  maxStrokeDasharray,
  rate,
  strokeDasharrayPercentage
}: {
  processingFillStrokeDasharrayRef: Ref<string>
  maxStrokeDasharray: number
  rate: number
  strokeDasharrayPercentage: number
}): void => {
  const strokeDasharrayVal: number = parseFloat(
    processingFillStrokeDasharrayRef.value.split(',')[0]
  )
  let num = strokeDasharrayVal + maxStrokeDasharray * rate
  if (num > maxStrokeDasharray) {
    num = maxStrokeDasharray
  }
  processingFillStrokeDasharrayRef.value = `${num}, ${strokeDasharrayPercentage}`
}

export const setProcessingTimer = ({
  timer,
  timeNow,
  sleepingRef,
  processingFillStrokeDasharrayRef,
  randomId,
  viewBoxWidth,
  maxStrokeDasharray,
  num
}: {
  timer: number
  timeNow: number
  sleepingRef: Ref<boolean>
  processingFillStrokeDasharrayRef: Ref<string>
  randomId: string
  viewBoxWidth: number
  maxStrokeDasharray: number
  num: number
}): void => {
  num++
  const strokeDasharrayPercentage = viewBoxWidth * 8
  if (num > Math.max(Math.ceil(1000 / (Date.now() - timeNow)), 60)) {
    clearProcessingTimer(timer)
    sleepingRef.value = true
    window.setTimeout(() => {
      processingFillStrokeDasharrayRef.value = `0, ${strokeDasharrayPercentage}`
      randomId = createId()
      sleepingRef.value = false
      timeNow = Date.now()
      timer = requestAnimationFrame(() =>
        setProcessingTimer({
          timer,
          timeNow,
          sleepingRef,
          processingFillStrokeDasharrayRef,
          randomId,
          viewBoxWidth,
          maxStrokeDasharray,
          num: 0
        })
      )
    }, 1000)
  } else {
    changeProcessingFillStrokeDasharray({
      processingFillStrokeDasharrayRef,
      maxStrokeDasharray,
      rate: Math.min((Date.now() - timeNow) / 1000, 1 / 60),
      strokeDasharrayPercentage
    })
    timeNow = Date.now()
    timer = requestAnimationFrame(() =>
      setProcessingTimer({
        timer,
        timeNow,
        sleepingRef,
        processingFillStrokeDasharrayRef,
        randomId,
        viewBoxWidth,
        maxStrokeDasharray,
        num
      })
    )
  }
}

export const clearProcessingTimer = (timer: number): void => {
  cancelAnimationFrame(timer)
}

export const calcPointPos = (
  r: number,
  arcLength: number,
  curArcRate: number
): number[] => {
  const arcAngle = (arcLength / (2 * Math.PI * r)) * 360 * curArcRate
  const x = 0.5 * (1 + Math.sin((arcAngle * Math.PI) / 180))
  const y = 0.5 * (1 - Math.cos((arcAngle * Math.PI) / 180))
  return [x, y]
}
