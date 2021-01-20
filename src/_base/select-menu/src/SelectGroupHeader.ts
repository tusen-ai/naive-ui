import { h, defineComponent, PropType } from 'vue'
import { TreeNode } from 'treemate'
import type { GroupOption } from '../../../select'

export default defineComponent({
  name: 'NBaseSelectGroupHeader',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode<GroupOption>>,
      required: true
    }
  },
  render () {
    const {
      tmNode: { rawNode }
    } = this
    const children = rawNode.render ? [rawNode.render(rawNode)] : [rawNode.name]
    return h(
      'div',
      {
        class: 'n-base-select-group-header'
      },
      children
    )
  }
})
