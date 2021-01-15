import { VNode } from 'vue'

export const DESCRIPTION_ITEM_FLAG = Symbol('DESCRIPTION_ITEM_FLAG')

export function isDescriptionsItem (vNode: VNode): boolean {
  return vNode.type && (vNode.type as any)[DESCRIPTION_ITEM_FLAG]
}
