import { useMemo } from 'vooks'
import { inject } from 'vue'

export function useAdjustedTo (props) {
  const modal = inject('NModalBody', null)
  const drawer = inject('NDrawerBody', null)
  return useMemo(() => {
    const { to } = props
    if (to !== undefined) return to
    if (modal) return modal.bodyRef
    if (drawer) return drawer.bodyRef
    return to ?? 'body'
  })
}
