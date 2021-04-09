import { Ref, InjectionKey } from 'vue'

export type PopoverTrigger = 'click' | 'hover' | 'manual'

export interface PopoverInst {
  syncPosition: () => void
  setShow: (value: boolean) => void
}

export type PopoverBodyInjection = Ref<HTMLElement | null> | null

export const popoverBodyInjectionKey: InjectionKey<PopoverBodyInjection> = Symbol(
  'popoverBodyInjection'
)
