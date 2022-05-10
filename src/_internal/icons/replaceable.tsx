import { upperFirst } from 'lodash-es'
import { defineComponent, inject } from 'vue'
import type { GlobalIconConfig } from '../../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../../config-provider/src/context'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function replaceable (name: keyof GlobalIconConfig, icon: JSX.Element) {
  return defineComponent({
    name: upperFirst(name),
    setup () {
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
