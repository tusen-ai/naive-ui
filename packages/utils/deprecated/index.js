/** deprecated */
const DROPDOWN_RELATED_COMPONENT = ['NDropdownItem', 'NDropdownSubmenu', 'NMenuItem', 'NSubmenu']
const SELECT_OPTION_LIKE_COMPONENT = ['NBaseSelectOption', 'NDropdownItem', 'NDropdownSubmenu', 'NMenuItem', 'NSubmenu']

function isSelectOptionLikeComponent (vNode) {
  return SELECT_OPTION_LIKE_COMPONENT.includes(getComponentNameOf(vNode))
}

function isDropdownRelatedComponent (vNode) {
  return DROPDOWN_RELATED_COMPONENT.includes(getComponentNameOf(vNode))
}

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

function getOptionPropsDataOf (vNode) {
  /**
   * Functional component
   */
  const propsData =
    (vNode.componentOptions && vNode.componentOptions.propsData) ||
    vNode.data.props ||
    {}
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
          // console.error(['[naive-ui/select-option]: Select Option only accept pure text as children.'])
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
  isDropdownRelatedComponent,
  isSelectOptionLikeComponent
}
