export interface Size {
  width: number
  height: number
}

export const extend = Object.assign

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
