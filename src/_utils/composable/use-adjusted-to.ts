import { useMemo } from 'vooks'
import { on, off } from 'evtd'
import {
  type ComponentPublicInstance,
  type ComputedRef,
  inject,
  onBeforeUnmount,
  onMounted,
  type PropType,
  ref
} from 'vue'
import { internalSelectionMenuBodyInjectionKey } from '../../_internal/select-menu/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'

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

  const fullscreenElementRef = ref<null | Element>()
  if (typeof document !== 'undefined') {
    fullscreenElementRef.value = document.fullscreenElement
    const handleFullscreenChange = (): void => {
      fullscreenElementRef.value = document.fullscreenElement
    }
    onMounted(() => {
      on('fullscreenchange', document, handleFullscreenChange)
    })
    onBeforeUnmount(() => {
      off('fullscreenchange', document, handleFullscreenChange)
    })
  }

  return useMemo(() => {
    const { to } = props
    if (to !== undefined) {
      if (to === false) return teleportDisabled
      if (to === true) return fullscreenElementRef.value || 'body'
      return to
    }
    if (modal?.value) {
      return (modal.value as ComponentPublicInstance).$el ?? modal.value
    }
    if (drawer?.value) return drawer.value
    if (popover?.value) return popover.value
    if (selectMenu?.value) return selectMenu.value
    return to ?? (fullscreenElementRef.value || 'body')
  })
}

// teleport disabled key
useAdjustedTo.tdkey = teleportDisabled
useAdjustedTo.propTo = {
  type: [String, Object, Boolean] as PropType<HTMLElement | string | boolean>,
  default: undefined
}

export { useAdjustedTo }
