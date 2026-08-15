import { isBrowser, isJsdom } from './_utils'

// Polyfill browser APIs
class _ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

function _matchMedia(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  }
}

if (isJsdom() && typeof window !== 'undefined') {
  window.ResizeObserver = _ResizeObserver
  window.matchMedia = _matchMedia
}

// https://github.com/jsdom/jsdom/issues/1422
if (isBrowser) {
  HTMLDivElement.prototype.scrollTo = () => {}
  HTMLDivElement.prototype.scrollBy = function (options) {
    if (typeof options === 'number')
      return
    if (options?.left)
      this.scrollLeft += options.left
    if (options?.top)
      this.scrollTop += options.top
  }
}
