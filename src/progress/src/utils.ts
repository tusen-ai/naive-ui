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
  sleepingRef,
  processingFillStrokeDasharrayRef,
  randomId,
  viewBoxWidth,
  maxStrokeDasharray
}: {
  timer: number
  sleepingRef: Ref<boolean>
  processingFillStrokeDasharrayRef: Ref<string>
  randomId: string
  viewBoxWidth: number
  maxStrokeDasharray: number
}): void => {
  let num = 0
  timer = window.setInterval(() => {
    num++
    const strokeDasharrayPercentage = viewBoxWidth * 8
    if (num === 63) {
      clearProcessingTimer(timer)
      sleepingRef.value = true
      window.setTimeout(() => {
        processingFillStrokeDasharrayRef.value = `0, ${strokeDasharrayPercentage}`
        randomId = createId()
        sleepingRef.value = false
        setProcessingTimer({
          timer,
          sleepingRef,
          processingFillStrokeDasharrayRef,
          randomId,
          viewBoxWidth,
          maxStrokeDasharray
        })
      }, 1000)
    }
    if (!processingFillStrokeDasharrayRef.value) {
      processingFillStrokeDasharrayRef.value = `0, ${strokeDasharrayPercentage}`
    } else {
      changeProcessingFillStrokeDasharray({
        processingFillStrokeDasharrayRef,
        maxStrokeDasharray,
        rate: 1 / 62,
        strokeDasharrayPercentage
      })
    }
  }, 16)
}
export const clearProcessingTimer = (timer: number): void => {
  window.clearInterval(timer as any)
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
