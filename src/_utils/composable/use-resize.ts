import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { resizeObserverManager } from 'vueuc'

interface UseOnResizeOptions {
  /**
   * In some cases
   * if a reactive variable is used in the render function to control whether or not the dom is rendered,
   * the event cannot be cleared in onBeforeUnmount because the dom no longer exists,
   *  but the event contains a reference to the dom, resulting in a memory leak
   */
  show?: Ref<boolean>
}
export function useOnResize(
  elRef: Ref<HTMLElement | null>,
  onResize: (() => void) | undefined,
  options?: UseOnResizeOptions
): void {
  // it needn't be reactive since it's for internal usage
  if (onResize) {
    onMounted(() => {
      const { value: el } = elRef
      if (el) {
        resizeObserverManager.registerHandler(el, onResize)
      }
    })
    onBeforeUnmount(() => {
      const { value: el } = elRef
      if (el) {
        resizeObserverManager.unregisterHandler(el)
      }
    })
    if (options?.show && isRef(options.show)) {
      onBeforeUpdate(() => {
        const { value: el } = elRef
        const { value: show } = options.show!
        if (!show && el) {
          resizeObserverManager.unregisterHandler(el)
        }
      })
    }
  }
}
