import type { VNode } from 'vue'
import type { GlobalIconConfig } from '../../config-provider/src/internal-interface'
import { upperFirst } from 'lodash-es'
import { defineComponent, h, inject } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export function replaceable(name: keyof GlobalIconConfig, icon: () => VNode) {
  const IconComponent = defineComponent({
    render() {
      return icon()
    }
  })
  return defineComponent({
    name: upperFirst(name),
    setup() {
      const mergedIconsRef = inject(
        configProviderInjectionKey,
        null
      )?.mergedIconsRef
      return () => {
        const iconOverride = mergedIconsRef?.value?.[name]
        return iconOverride ? iconOverride() : <IconComponent />
      }
    }
  })
}
