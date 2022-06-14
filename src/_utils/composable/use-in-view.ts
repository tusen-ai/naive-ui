import { onBeforeUnmount, onMounted, Ref, ref } from 'vue'

export const useInView = (
  $ref: Ref<HTMLElement | undefined>,
  onInView: (inView: boolean) => void,
  options?: IntersectionObserverInit & { triggerOnce?: boolean }
): Ref<boolean> => {
  const inView = ref(false)

  let observer: IntersectionObserver | undefined
  onMounted(() => {
    if (!$ref.value) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onInView(true)
          inView.value = true

          if (options?.triggerOnce) {
            observer?.disconnect()
          }
        } else {
          onInView(false)
          inView.value = false
        }
      },
      { ...options }
    )

    observer.observe($ref.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return inView
}
