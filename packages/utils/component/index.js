const DROPDOWN_RELATED_COMPONENT = ['NDropdownItem', 'NDropdownSubmenu']

function isDropdownRelatedComponent (vNode) {
  if (DROPDOWN_RELATED_COMPONENT.includes(getComponentNameOf(vNode))) {
    return true
  }
  return false
}

function getComponentNameOf (vNode) {
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
  if (componentInstance.$slots[slotName]) return componentInstance.$slots[slotName]
  if (componentInstance.$scopedSlots[slotName]) return componentInstance.$scopedSlots[slotName]()
  return []
}

function getOptionPropsDataOf (vNode) {
  const propsData = vNode.componentOptions.propsData || {}
  if (!isDropdownRelatedComponent(vNode)) {
    /**
     * Select Option
     * value is required!
     * label should be set here
     */
    if (!propsData.label) {
      if (vNode.componentOptions.children) {
        try {
          propsData.label = vNode.componentOptions.children[0].text.trim()
        } catch (err) {
          console.error(['naive-ui/select-option: Select Option only accept pure text as children.'])
          propsData.label = null
        }
      } else if (propsData.value) {
        propsData.label = String(propsData.value)
      }
    }
  } else {
    /**
     * DropdownItem & DropdownSubmenu
     */
  }
  return propsData
}

export {
  getSlotOf,
  getDefaultSlotOf,
  getComponentNameOf,
  getOptionPropsDataOf,
  isDropdownRelatedComponent
}
