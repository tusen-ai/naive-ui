<script>
import {
  isDropdownRelatedComponent
} from '../../../utils/component'

export default {
  functional: true,
  render (h, context) {
    if (!context.scopedSlots.default) return []
    const defaultSlot = context.scopedSlots.default()
    let counter = 1
    defaultSlot.forEach((vNode, index) => {
      if (vNode.componentOptions) {
        if (isDropdownRelatedComponent(vNode)) {
          /**
           * id of options start from 1
           */
          vNode.componentOptions.propsData.value = counter++
        }
      }
      vNode.key = index
    })
    return defaultSlot
  }
}
</script>
