import type { Ref } from 'vue'

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

// root -> options -> [observer, elements]
const observers = new WeakMap<
Document | Element,
Map<string, [IntersectionObserver, Set<Element | Document>]>
>()

const unobserveHandleMap = new WeakMap<HTMLElement, () => void>()
const shouldStartLoadingRefMap = new WeakMap<HTMLElement, Ref<boolean>>()

export const observeIntersection: (
  el: HTMLElement | null,
  options: IntersectionObserverOptions | undefined,
  shouldStartLoadingRef: Ref<boolean>
) => () => void = (el, options, shouldStartLoadingRef) => {
  if (!el) return () => {}
  const resolvedOptionsAndHash = resolveOptionsAndHash(options)
  const { root } = resolvedOptionsAndHash.options
  let rootObservers: Map<
  string,
  [IntersectionObserver, Set<Element | Document>]
  >
  const _rootObservers = observers.get(root)
  if (_rootObservers) {
    rootObservers = _rootObservers
  } else {
    rootObservers = new Map()
    observers.set(root, rootObservers)
  }
  let observer: IntersectionObserver
  let observerAndObservedElements: [
    IntersectionObserver,
    Set<Element | Document>
  ]
  if (rootObservers.has(resolvedOptionsAndHash.hash)) {
    observerAndObservedElements =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rootObservers.get(resolvedOptionsAndHash.hash)!
    if (!observerAndObservedElements[1].has(el)) {
      observer = observerAndObservedElements[0]
      observerAndObservedElements[1].add(el)
      observer.observe(el)
    }
  } else {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const _unobserve = unobserveHandleMap.get(
            entry.target as HTMLImageElement
          )
          const _shouldStartLoadingRef = shouldStartLoadingRefMap.get(
            entry.target as HTMLImageElement
          )
          if (_unobserve) _unobserve()
          if (_shouldStartLoadingRef) {
            _shouldStartLoadingRef.value = true
          }
        }
      })
    }, resolvedOptionsAndHash.options)
    observer.observe(el)
    observerAndObservedElements = [observer, new Set([el])]
    rootObservers.set(resolvedOptionsAndHash.hash, observerAndObservedElements)
  }
  let unobservered = false
  const unobserve = (): void => {
    if (unobservered) return
    unobserveHandleMap.delete(el)
    shouldStartLoadingRefMap.delete(el)
    unobservered = true
    if (observerAndObservedElements[1].has(el)) {
      observerAndObservedElements[0].unobserve(el)
      observerAndObservedElements[1].delete(el)
    }
    if (observerAndObservedElements[1].size <= 0) {
      rootObservers.delete(resolvedOptionsAndHash.hash)
    }
    if (!rootObservers.size) {
      observers.delete(root)
    }
  }
  unobserveHandleMap.set(el, unobserve)
  shouldStartLoadingRefMap.set(el, shouldStartLoadingRef)
  return unobserve
}
