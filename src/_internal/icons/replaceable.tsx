import type { GlobalIconConfig } from '../../config-provider/src/internal-interface'
import { upperFirst } from 'lodash-es'
import { defineComponent, inject } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export function replaceable(name: keyof GlobalIconConfig, icon: JSX.Element) {
  return defineComponent({
    name: upperFirst(name),
    setup() {
      const mergedIconsRef = inject(
        configProviderInjectionKey,
        null
      )?.mergedIconsRef
      return () => {
        const iconOverride = mergedIconsRef?.value?.[name]
        return iconOverride ? iconOverride() : icon
      }
    }
  })
}
