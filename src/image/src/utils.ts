export type IntersectionObserverOptions = Omit<
IntersectionObserverInit,
'root'
> & {
  root?: Element | Document | null | string
}

export const resolveOptionsAndHash = (
  options: IntersectionObserverOptions | undefined = {}
): {
  hash: string
  options: Omit<IntersectionObserverInit, 'root'> & { root: Element | Document }
} => {
  const { root = null } = options
  return {
    hash: `${options.rootMargin || '0px 0px 0px 0px'}-${
      Array.isArray(options.threshold)
        ? options.threshold.join(',')
        : options.threshold ?? '0'
    }`,
    options: {
      ...options,
      root:
        (typeof root === 'string' ? document.querySelector(root) : root) ||
        document.documentElement
    }
  }
}

const observers = new WeakMap<
Document | Element,
Map<string, [IntersectionObserver, number]>
>()

export const observeIntersection: (
  el: HTMLImageElement | null,
  options: IntersectionObserverOptions | undefined
) => () => void = (el, options) => {
  if (!el) return () => {}
  const resolvedOptionsAndHash = resolveOptionsAndHash(options)
  let rootObservers: Map<string, [IntersectionObserver, number]>
  const _rootObservers = observers.get(resolvedOptionsAndHash.options.root)
  if (_rootObservers) {
    rootObservers = _rootObservers
  } else {
    rootObservers = new Map()
    observers.set(resolvedOptionsAndHash.options.root, rootObservers)
  }
  let observer: IntersectionObserver
  if (rootObservers.has(resolvedOptionsAndHash.hash)) {
    const observerAndObservedElementCount =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rootObservers.get(resolvedOptionsAndHash.hash)!
    observer = observerAndObservedElementCount[0]
    observerAndObservedElementCount[1]++
  } else {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (!img.src) {
            img.src = img.dataset.src || ''
          }
        }
      })
    })
    rootObservers.set(resolvedOptionsAndHash.hash, [observer, 1])
  }
  observer.observe(el)
  return () => {
    const observerAndObservedElementCount = rootObservers.get(
      resolvedOptionsAndHash.hash
    )
    if (observerAndObservedElementCount) {
      observerAndObservedElementCount[0].unobserve(el)
      observerAndObservedElementCount[1]--
      if (observerAndObservedElementCount[1] <= 0) {
        rootObservers.delete(resolvedOptionsAndHash.hash)
      }
      if (!rootObservers.size) {
        observers.delete(resolvedOptionsAndHash.options.root)
      }
    }
  }
}
