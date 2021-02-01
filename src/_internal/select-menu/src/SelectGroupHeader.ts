import { h, defineComponent, PropType } from 'vue'
import { TreeNode } from 'treemate'
import type { SelectGroupOption } from '../../../select'

export default defineComponent({
  name: 'NBaseSelectGroupHeader',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode<SelectGroupOption>>,
      required: true
    }
  },
  render () {
    const {
      tmNode: { rawNode }
    } = this
    const children = rawNode.render
      ? [rawNode.render(rawNode)]
      : [rawNode.label || (rawNode.name as any)]
    return h(
      'div',
      {
        class: 'n-base-select-group-header'
      },
      children
    )
  }
})
