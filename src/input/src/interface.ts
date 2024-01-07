import type { Ref, UnwrapRef } from 'vue'
import { createInjectionKey } from '../../_utils'

export type Size = 'tiny' | 'small' | 'medium' | 'large'

export type OnUpdateValue = (
  value: string & [string, string],
  meta: { source: 0 | 1 | 'clear' }
) => void
export type OnUpdateValueImpl = (
  value: string | [string, string],
  meta: { source: 0 | 1 | 'clear' }
) => void

export interface InputWrappedRef {
  wrapperElRef: Ref<HTMLElement | null>
  textareaElRef: Ref<HTMLTextAreaElement | null>
  inputElRef: Ref<HTMLInputElement | null>
  isCompositing: Ref<boolean>
  blur: () => void
  clear: () => void
  focus: () => void
  select: () => void
  activate: () => void
  deactivate: () => void
  scrollTo: (options: ScrollToOptions) => void
}

export type InputInst = UnwrapRef<InputWrappedRef>

export const inputInjectionKey = createInjectionKey<{
  countGraphemesRef: Ref<((input: string) => number) | undefined>
  mergedValueRef: Ref<string | [string, string] | null>
  maxlengthRef: Ref<number | undefined>
  mergedClsPrefixRef: Ref<string>
}>('n-input')
