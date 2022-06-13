let imgObserver: IntersectionObserver | null = null

let imgObserverOptions: {
  root: HTMLElement | null
  threshold: number
} | null

const imgObserverCallback: IntersectionObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      if (!img.src) {
        img.src = img.dataset.src || ''
      }
    }
  })
}

export const imgObserverHandler: (
  el: HTMLImageElement | null,
  unobserve: boolean,
  root?: string
) => void = (el, unobserve = false, root = 'body') => {
  if (el === null) return
  if (unobserve) {
    if (imgObserver) {
      imgObserver.unobserve(el)
    }
    return
  }
  if (imgObserver === null) {
    imgObserverOptions = {
      root: document.querySelector(root),
      threshold: 0.1
    }
    imgObserver = new IntersectionObserver(
      imgObserverCallback,
      imgObserverOptions
    )
  }
  imgObserver.observe(el)
}
