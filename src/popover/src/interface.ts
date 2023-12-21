import { type Ref, type CSSProperties, type VNode } from 'vue'
import { createInjectionKey } from '../../_utils/vue/create-injection-key'

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'

export interface PopoverInst {
  syncPosition: () => void
  setShow: (value: boolean) => void
}

export type InternalPopoverInst = PopoverInst & {
  getMergedShow: () => boolean
}

export type PopoverBodyInjection = Ref<HTMLElement | null> | null

export const popoverBodyInjectionKey =
  createInjectionKey<PopoverBodyInjection>('n-popover-body')

export type InternalRenderBody = (
  className: any,
  ref: Ref<HTMLElement | null>,
  style: CSSProperties[],
  onMouseenter: (e: MouseEvent) => void,
  onMouseleave: (e: MouseEvent) => void
) => VNode
