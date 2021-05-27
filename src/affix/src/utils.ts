export type ScrollTarget = Window | Document | HTMLElement

export function getScrollTop (target: ScrollTarget): number {
  return target instanceof HTMLElement ? target.scrollTop : window.scrollY
}

export function getRect (target: ScrollTarget): { top: number, bottom: number } {
  return target instanceof HTMLElement
    ? target.getBoundingClientRect()
    : { top: 0, bottom: window.innerHeight }
}
