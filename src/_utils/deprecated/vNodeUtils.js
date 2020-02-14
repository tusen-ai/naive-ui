function getComponentNameOf (vNode) {
  /**
   * Functional component
   */
  if (vNode.fnOptions && vNode.fnOptions.name) {
    return vNode.fnOptions.name
  }
  if (
    vNode.componentOptions &&
    vNode.componentOptions.Ctor &&
    vNode.componentOptions.Ctor.extendOptions &&
    vNode.componentOptions.Ctor.extendOptions.name
  ) {
    return vNode.componentOptions.Ctor.extendOptions.name
  }
  return null
}

function getDefaultSlotOf (componentInstance) {
  return getSlotOf(componentInstance, 'default')
}

function getSlotOf (componentInstance, slotName) {
  if (componentInstance.$slots[slotName]) return componentInstance.$slots[slotName] || []
  if (componentInstance.$scopedSlots[slotName]) return componentInstance.$scopedSlots[slotName]() || []
  return []
}

export {
  getSlotOf,
  getDefaultSlotOf,
  getComponentNameOf
}
