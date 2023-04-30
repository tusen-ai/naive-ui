import type { Size } from '../interface'

export * from './duplicatedLogic'
export * from './event'

export function calculateSize (element: HTMLElement, innerOnly?: boolean): Size {
  let { offsetWidth: width, offsetHeight: height } = element
  if (innerOnly) {
    const style = getComputedStyle(element)
    width =
      width -
      parseFloat(style.getPropertyValue('padding-left')) -
      parseFloat(style.getPropertyValue('padding-right'))
    height =
      height -
      parseFloat(style.getPropertyValue('padding-top')) -
      parseFloat(style.getPropertyValue('padding-bottom'))
  }
  return { width, height }
}

export function clampValue (value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export function resolveSpeed (value?: string | number): number {
  if (value === undefined) return 0
  if (typeof value === 'number') return value
  const timeRE = /^((\d+)?\.?\d+?)(ms|s)?$/
  const match = value.match(timeRE)
  if (match) {
    const [, number, , unit = 'ms'] = match
    return Number(number) * (unit === 'ms' ? 1 : 1000)
  }
  return 0
}
