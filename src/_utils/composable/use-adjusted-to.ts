import { useMemo } from 'vooks'
import { ComputedRef, inject } from 'vue'

interface UseAdjustedToProps {
  to?: string
  [key: string]: unknown
}

interface ModalInjection {
  bodyRef: HTMLElement
}

interface DrawerInjection {
  bodyRef: HTMLElement
}

export function useAdjustedTo (
  props: UseAdjustedToProps
): ComputedRef<HTMLElement | string> {
  const modal = inject<ModalInjection | null>('NModalBody', null)
  const drawer = inject<DrawerInjection | null>('NDrawerBody', null)
  return useMemo(() => {
    const { to } = props
    if (to !== undefined) return to
    if (modal) return modal.bodyRef
    if (drawer) return drawer.bodyRef
    return to ?? 'body'
  })
}
