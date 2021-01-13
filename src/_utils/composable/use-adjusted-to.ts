import { useMemo } from 'vooks'
import { inject } from 'vue'

interface UseAdjustedToProps {
  to?: string
}

interface ModalInjection {
  bodyRef: Element
}

interface DrawerInjection {
  bodyRef: Element
}

export function useAdjustedTo (props: UseAdjustedToProps) {
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
