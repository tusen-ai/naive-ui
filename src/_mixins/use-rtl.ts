import { Ref, onBeforeMount, inject, watchEffect, computed } from 'vue'
import { ssrInjectionKey } from '../ssr/context'
import {
  RtlEnabledState,
  RtlItem
} from '../config-provider/src/internal-interface'

// The current implemention will take extra perf & memory usage. I just want to
// make it work now. If we can determine whether the style is already mounted,
// we won't need to watch effect. However, we need to make css-render support
// it. We need to refactor ssrAdapter and expose a exists function
export default function useRtl (
  mountId: string,
  rtlStateRef: Ref<RtlEnabledState | undefined> | undefined,
  clsPrefixRef: Ref<string>
): Ref<RtlItem | undefined> | undefined {
  if (!rtlStateRef) return undefined
  const ssrAdapter = inject(ssrInjectionKey, undefined)
  const componentRtlStateRef = computed(() => {
    const { value: rtlState } = rtlStateRef
    if (!rtlState) {
      return undefined
    }
    const componentRtlState = rtlState[mountId as keyof RtlEnabledState]
    if (!componentRtlState) {
      return undefined
    }
    return componentRtlState
  })
  const mountStyle = (): void => {
    watchEffect(() => {
      const { value: clsPrefix } = clsPrefixRef
      const { value: componentRtlState } = componentRtlStateRef
      if (!componentRtlState) return
      componentRtlState.style.mount({
        id: `${clsPrefix}${mountId}Rtl`,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined
        },
        ssr: ssrAdapter
      })
    })
  }
  if (ssrAdapter) {
    mountStyle()
  } else {
    onBeforeMount(mountStyle)
  }
  return componentRtlStateRef
}
