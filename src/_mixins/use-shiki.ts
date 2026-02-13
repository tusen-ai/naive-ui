import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'

export interface Shiki {
  /**
   * The consumer (e.g. n-code / n-log) only cares about the rendered HTML string.
   * Users may configure languages, themes or hooks when constructing the Shiki
   * instance, but all those details should be hidden behind this single method.
   */
  codeToHtml: (code: string) => string
}

interface UseShikiProps {
  shiki?: Shiki
}

export default function useShiki(
  props: UseShikiProps
): ComputedRef<Shiki | undefined> {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  return computed(() => {
    return (props.shiki as any) || NConfigProvider?.mergedShikiRef?.value
  })
}
