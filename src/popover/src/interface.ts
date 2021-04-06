export type PopoverTrigger = 'click' | 'hover' | 'manual'

export interface PopoverInst {
  syncPosition: () => void
  setShow: (value: boolean) => void
}
