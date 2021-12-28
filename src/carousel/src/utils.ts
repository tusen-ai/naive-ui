export const extend = Object.assign

export interface Size {
  width: number
  height: number
}

export function isTouchEvent (e: MouseEvent | TouchEvent): e is TouchEvent {
  return window.TouchEvent && e instanceof window.TouchEvent
}

export function calculateSize (
  element: HTMLElement,
  innerOnly?: boolean
): Size {
  if (innerOnly) {
    let width = element.clientWidth
    let height = element.clientHeight
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
  } else {
    const rect = element.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height
    }
  }
}

export function getDisplayIndex (
  current: number,
  length: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable
    ? current
    : current === 0
      ? length - 3
      : current === length - 1
        ? 0
        : current - 1
}

export function getRealityIndex (
  current: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable ? current : current + 1
}

export function getPrevIndex (
  current: number,
  length: number,
  duplicatedable?: boolean
): number | null {
  if (current < 0) return null
  return current === 0 ? (duplicatedable ? length - 1 : null) : current - 1
}

export function getNextIndex (
  current: number,
  length: number,
  duplicatedable?: boolean
): number | null {
  if (current > length - 1) return null
  return current === length - 1 ? (duplicatedable ? 0 : null) : current + 1
}
