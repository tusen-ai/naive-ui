let imgObserver: IntersectionObserver | null = null

let imgObserverOptions: {
  root: HTMLElement | null
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
  root?: string
) => void = (el, root = 'body') => {
  if (el === null) return
  if (imgObserver === null) {
    imgObserverOptions = {
      root: document.querySelector(root)
    }
    imgObserver = new IntersectionObserver(
      imgObserverCallback,
      imgObserverOptions
    )
  }
  imgObserver.observe(el)
}

export const imgUnobserverHandler: (el: HTMLImageElement | null) => void = (
  el
) => {
  if (el === null) return
  if (imgObserver) {
    imgObserver.unobserve(el)
  }
}
