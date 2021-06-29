import { useMemo } from 'vooks'
import { ComponentPublicInstance, ComputedRef, inject, PropType } from 'vue'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { internalSelectionMenuBodyInjectionKey } from '../../_internal/select-menu/src/interface'

interface UseAdjustedToProps {
  to?: string | HTMLElement | boolean
  [key: string]: unknown
}

const teleportDisabled = '__disabled__'

function useAdjustedTo (
  props: UseAdjustedToProps
): ComputedRef<HTMLElement | string> {
  const modal = inject(modalBodyInjectionKey, null)
  const drawer = inject(drawerBodyInjectionKey, null)
  const popover = inject(popoverBodyInjectionKey, null)
  const selectMenu = inject(internalSelectionMenuBodyInjectionKey, null)
  return useMemo(() => {
    const { to } = props
    if (to !== undefined) {
      if (to === false) return teleportDisabled
      if (to === true) return 'body'
      return to
    }
    if (modal?.value) {
      return (modal.value as ComponentPublicInstance).$el ?? modal.value
    }
    if (drawer?.value) return drawer.value
    if (popover?.value) return popover.value
    if (selectMenu?.value) return selectMenu.value
    return to ?? 'body'
  })
}

// teleport disabled key
useAdjustedTo.tdkey = teleportDisabled
useAdjustedTo.propTo = {
  type: [String, Object, Boolean] as PropType<HTMLElement | string | boolean>,
  default: undefined
}

export { useAdjustedTo }
