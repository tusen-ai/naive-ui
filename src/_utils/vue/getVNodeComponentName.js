export default function getVNodeComponentName (vNode) {
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
