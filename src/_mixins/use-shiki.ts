import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'

interface UseShikiProps {
  shiki?: unknown
  [key: string]: unknown
}

export interface Shiki {
  codeToHtml: (code: string, options: any) => string
}

export default function useShiki(
  props: UseShikiProps
): ComputedRef<Shiki | undefined> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return computed(() => {
    return (props.shiki as any) || NConfigProvider?.mergedShikiRef?.value
  })
}
