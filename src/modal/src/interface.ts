import { Ref, ComponentPublicInstance, InjectionKey } from 'vue'

export type ModalBodyInjection = Ref<
HTMLElement | ComponentPublicInstance | null
> | null

export const modalBodyInjectionKey: InjectionKey<ModalBodyInjection> = Symbol(
  'modalBodyInjection'
)
