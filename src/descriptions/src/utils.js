export const DESCRIPTION_ITEM_FLAG = Symbol('DESCRIPTION_ITEM_FLAG')

export function isDescriptionsItem (vNode) {
  return (
    vNode.type &&
    vNode.type[DESCRIPTION_ITEM_FLAG]
  )
}
