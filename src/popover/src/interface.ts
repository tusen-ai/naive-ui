export type PopoverTrigger = 'click' | 'hover'

export interface PopoverRef {
  syncPosition: () => void
  setShow: (value: boolean) => void
}
