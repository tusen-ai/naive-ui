import { type Slots, type VNode } from 'vue'
import { flatten } from './flatten'
import { warn } from '../naive'

export function getFirstSlotVNode (
  slots: Slots,
  slotName = 'default',
  props: unknown = undefined
): VNode | null {
  const slot = slots[slotName]
  if (!slot) {
    warn('getFirstSlotVNode', `slot[${slotName}] is empty`)
    return null
  }
  const slotContent = flatten(slot(props))
  // vue will normalize the slot, so slot must be an array
  if (slotContent.length === 1) {
    return slotContent[0]
  } else {
    warn('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`)
    return null
  }
}
