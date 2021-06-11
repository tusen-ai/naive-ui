export function isTouchEvent (e: MouseEvent | TouchEvent): boolean {
  return window.TouchEvent && e instanceof window.TouchEvent
}
