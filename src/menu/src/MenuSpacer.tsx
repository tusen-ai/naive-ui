import { h, defineComponent, inject } from 'vue'
import { menuInjectionKey } from './context'

export default defineComponent({
  name: 'MenuSpacer',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NMenu = inject(menuInjectionKey)!
    const { mergedClsPrefixRef } = NMenu
    return () => <div class={`${mergedClsPrefixRef.value}-menu-spacer`} />
  }
})
