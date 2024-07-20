import { defineComponent, h, inject } from 'vue'
import { menuInjectionKey } from './context'

export default defineComponent({
  name: 'MenuDivider',
  setup() {
    const NMenu = inject(menuInjectionKey)!
    const { mergedClsPrefixRef, isHorizontalRef } = NMenu
    return () =>
      isHorizontalRef.value ? null : (
        <div class={`${mergedClsPrefixRef.value}-menu-divider`} />
      )
  }
})
