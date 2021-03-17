import { useMemo } from 'vooks'
import { ComponentPublicInstance, ComputedRef, inject } from 'vue'
import type { ModalBodyInjection } from '../../modal/src/BodyWrapper'
import type { DrawerBodyInjection } from '../../drawer/src/DrawerBodyWrapper'

interface UseAdjustedToProps {
  to?: string | HTMLElement
  [key: string]: unknown
}

export function useAdjustedTo (
  props: UseAdjustedToProps
): ComputedRef<HTMLElement | string> {
  const modal = inject<ModalBodyInjection | null>('NModalBody', null)
  const drawer = inject<DrawerBodyInjection | null>('NDrawerBody', null)
  return useMemo(() => {
    const { to } = props
    if (to !== undefined) return to
    if (modal?.bodyRef) {
      return (modal.bodyRef as ComponentPublicInstance).$el ?? modal.bodyRef
    }
    if (drawer) return drawer.bodyRef
    return to ?? 'body'
  })
}
