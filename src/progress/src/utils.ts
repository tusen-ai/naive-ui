import { Ref, ref, ComputedRef } from 'vue'
import { createId } from 'seemly'

const changeProcessingFillStrokeDasharray = ({
  processingFillStrokeDasharrayRef,
  maxStrokeDasharray,
  rate,
  viewBoxWidth,
  idx
}: {
  processingFillStrokeDasharrayRef: Ref<string> | Ref<string[]>
  maxStrokeDasharray: number
  rate: number
  viewBoxWidth: number
  idx?: number
}): void => {
  const isArray = Array.isArray(processingFillStrokeDasharrayRef.value)
  const strokeDasharrayVal: number = isArray
    ? parseFloat(
      processingFillStrokeDasharrayRef.value[idx as number].split(',')[0]
    )
    : parseFloat(
      (processingFillStrokeDasharrayRef.value as string).split(',')[0]
    )
  let num = strokeDasharrayVal + maxStrokeDasharray * rate
  if (num > maxStrokeDasharray) {
    num = 0
  }
  isArray
    ? ((processingFillStrokeDasharrayRef as Ref<string[]>).value[
        idx as number
      ] = `${num}, ${viewBoxWidth * 8}`)
    : (processingFillStrokeDasharrayRef.value = `${num}, ${viewBoxWidth * 8}`)
}

const initProcessingFillStrokeDasharrayRef = ({
  processingFillStrokeDasharrayRef,
  percentage,
  viewBoxWidth
}: {
  processingFillStrokeDasharrayRef: Ref<string> | Ref<string[]>
  percentage: number | number[]
  viewBoxWidth: number
}): void => {
  const isArray = Array.isArray(processingFillStrokeDasharrayRef.value)
  processingFillStrokeDasharrayRef.value = isArray
    ? (percentage as number[]).map(() => `0, ${viewBoxWidth * 8}`)
    : `0, ${viewBoxWidth * 8}`
}

const calcMaxStrokeDasharray = ({
  percentage,
  viewBoxWidth,
  strokeWidth,
  circleGap,
  idx
}: {
  percentage: number | number[]
  viewBoxWidth?: number
  strokeWidth?: number
  circleGap?: number
  idx?: number
}): number => {
  if (idx === undefined) {
    return Math.PI * (percentage as number)
  }
  return (
    ((Math.PI * (percentage as number[])[idx]) / 100) *
    ((viewBoxWidth as number) / 2 -
      ((strokeWidth as number) / 2) * (1 + 2 * idx) -
      (circleGap as number) * idx) *
    2
  )
}

export const setProcessingTimer = ({
  timerRef,
  sleepingRef,
  processingFillStrokeDasharrayRef,
  randomIdRef,
  percentage,
  viewBoxWidth,
  strokeWidth,
  circleGap
}: {
  timerRef: Ref<number>
  sleepingRef: Ref<boolean>
  processingFillStrokeDasharrayRef: Ref<string> | Ref<string[]>
  randomIdRef: Ref<string>
  percentage: number | number[]
  viewBoxWidth: number
  strokeWidth?: number
  circleGap?: number
}): void => {
  const num = ref<number>(0)
  const isArray = Array.isArray(processingFillStrokeDasharrayRef.value)
  timerRef.value = window.setInterval(() => {
    num.value++
    if (num.value === 62) {
      clearProcessingTimer(timerRef)
      sleepingRef.value = true
      initProcessingFillStrokeDasharrayRef({
        processingFillStrokeDasharrayRef,
        percentage,
        viewBoxWidth
      })
      window.setTimeout(() => {
        randomIdRef.value = createId()
        sleepingRef.value = false
        setProcessingTimer({
          timerRef,
          sleepingRef,
          processingFillStrokeDasharrayRef,
          randomIdRef,
          percentage,
          viewBoxWidth,
          strokeWidth,
          circleGap
        })
      }, 1000)
    }
    if (
      !processingFillStrokeDasharrayRef.value ||
      (isArray && !processingFillStrokeDasharrayRef.value.length)
    ) {
      initProcessingFillStrokeDasharrayRef({
        processingFillStrokeDasharrayRef,
        percentage,
        viewBoxWidth
      })
    } else {
      if (isArray) {
        ;(processingFillStrokeDasharrayRef as Ref<string[]>).value.forEach(
          (_, idx) => {
            const maxStrokeDasharray = calcMaxStrokeDasharray({
              percentage,
              viewBoxWidth,
              strokeWidth,
              circleGap,
              idx
            })
            changeProcessingFillStrokeDasharray({
              processingFillStrokeDasharrayRef,
              maxStrokeDasharray,
              rate: 0.014,
              viewBoxWidth,
              idx
            })
          }
        )
      } else {
        const maxStrokeDasharray = calcMaxStrokeDasharray({ percentage })
        changeProcessingFillStrokeDasharray({
          processingFillStrokeDasharrayRef,
          maxStrokeDasharray,
          rate: 0.014,
          viewBoxWidth: viewBoxWidth
        })
      }
    }
  }, 16)
}
export const clearProcessingTimer = (timerRef: Ref<number>): void => {
  window.clearInterval(timerRef.value as any)
}

const calcPointPos = (r: number, arcLength: number): number[] => {
  const arcAngle = (arcLength / (2 * Math.PI * r)) * 360
  const angleFromStartPoint =
    arcAngle < 360 - 45 ? 45 + arcAngle : arcAngle - 315
  const x = 0.5 + 0.5 * Math.cos((angleFromStartPoint * Math.PI) / 180)
  const y = 0.5 + Math.sin((angleFromStartPoint * Math.PI) / 180)
  return [x, y]
}

export const calcLightestCurPointPos = (
  r: number | number[],
  curArcLengthRef: ComputedRef<number> | ComputedRef<number[]>
): number[] | number[][] => {
  if (Array.isArray(curArcLengthRef.value)) {
    return curArcLengthRef.value.map((item, idx) => {
      return calcPointPos((r as number[])[idx], item)
    })
  }
  return calcPointPos(
    r as number,
    (curArcLengthRef as ComputedRef<number>).value
  )
}
