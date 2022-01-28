import { h, defineComponent, inject } from 'vue'
import { menuInjectionKey } from './context'

export default defineComponent({
  name: 'MenuDivider',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NMenu = inject(menuInjectionKey)!
    const { mergedClsPrefixRef, isHorizontalRef } = NMenu
    return () =>
      isHorizontalRef.value ? null : (
        <div class={`${mergedClsPrefixRef.value}-menu-divider`} />
      )
  }
})
