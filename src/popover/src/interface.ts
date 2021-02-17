export type PopoverTrigger = 'click' | 'hover' | 'manual'

export interface PopoverRef {
  syncPosition: () => void
  setShow: (value: boolean) => void
}
