import { Size } from '../src/interface'

export * from './duplicatedLogic'
export * from './event'
export { default as supportsPassive } from './supportsPassive'

export function calculateSize (element: HTMLElement, innerOnly?: boolean): Size {
  let width = element.clientWidth
  let height = element.clientHeight
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
    return { width, height }
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
