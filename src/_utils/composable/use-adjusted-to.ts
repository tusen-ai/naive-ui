import { useMemo } from 'vooks'
import { ComponentPublicInstance, ComputedRef, inject } from 'vue'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'

interface UseAdjustedToProps {
  to?: string | HTMLElement
  [key: string]: unknown
}

export function useAdjustedTo (
  props: UseAdjustedToProps
): ComputedRef<HTMLElement | string> {
  const modal = inject(modalBodyInjectionKey, null)
  const drawer = inject(drawerBodyInjectionKey, null)
  const popover = inject(popoverBodyInjectionKey, null)
  return useMemo(() => {
    const { to } = props
    if (to !== undefined) return to
    if (modal?.value) {
      return (modal.value as ComponentPublicInstance).$el ?? modal.value
    }
    if (drawer?.value) return drawer.value
    if (popover?.value) return popover.value
    return to ?? 'body'
  })
}
