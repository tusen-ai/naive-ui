export type OffsetTarget = Window | Document | HTMLElement

export function getOffset (
  el: HTMLElement,
  scrollTarget: OffsetTarget
): {
    top: number
    height: number
  } {
  const { top: elTop, height } = el.getBoundingClientRect()
  const scrollTargetTop =
    scrollTarget instanceof HTMLElement
      ? scrollTarget.getBoundingClientRect().top
      : 0
  return {
    top: elTop - scrollTargetTop,
    height
  }
}
