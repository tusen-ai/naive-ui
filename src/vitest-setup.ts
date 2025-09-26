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

if (typeof window !== 'undefined') {
  if (typeof window.ResizeObserver === 'undefined') {
    window.ResizeObserver = _ResizeObserver
  }
  if (typeof window.matchMedia === 'undefined') {
    window.matchMedia = _matchMedia
  }

  const protoList = [HTMLDivElement.prototype, HTMLElement.prototype]
  protoList.forEach((proto) => {
    if (typeof proto.scrollTo !== 'function') {
      proto.scrollTo = () => {}
    }
  })
}
