import type { VNodeChild } from 'vue'

export const DESCRIPTION_ITEM_FLAG = 'DESCRIPTION_ITEM_FLAG'

export function isDescriptionsItem (vNode: VNodeChild): boolean {
  if (typeof vNode === 'object' && vNode && !Array.isArray(vNode)) {
    return vNode.type && (vNode.type as any)[DESCRIPTION_ITEM_FLAG]
  }
  return false
}
