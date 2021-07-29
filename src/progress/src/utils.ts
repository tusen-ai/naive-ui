import { Ref } from 'vue'

export const changeProcessingFillStrokeDasharray = ({
  processingFillStrokeDasharrayRef,
  maxStrokeDasharray,
  percentage,
  rate,
  speedRef,
  viewBoxWidth,
  idx
}: {
  processingFillStrokeDasharrayRef: Ref<string> | Ref<string[]>
  maxStrokeDasharray: number
  percentage: number
  rate: number
  speedRef: Ref<number>
  viewBoxWidth: number
  idx?: number
}): void => {
  const strokeDasharrayVal: number = parseFloat(
    idx !== undefined
      ? processingFillStrokeDasharrayRef.value[idx].split(',')[0]
      : (processingFillStrokeDasharrayRef.value as string).split(',')[0]
  )
  let num = strokeDasharrayVal + maxStrokeDasharray * rate * speedRef.value++
  if (num > maxStrokeDasharray) {
    num = 0
    speedRef.value = 1
  }
  idx !== undefined // @ts-expect-error
    ? (processingFillStrokeDasharrayRef.value[idx] = `${num}, ${
        viewBoxWidth * 8
      }`)
    : (processingFillStrokeDasharrayRef.value = `${num}, ${viewBoxWidth * 8}`)
}
