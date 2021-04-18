import { h, defineComponent, PropType } from 'vue'
import { TreeNode } from 'treemate'
import type { SelectGroupOption } from '../../../select/src/interface'

export default defineComponent({
  name: 'NBaseSelectGroupHeader',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<TreeNode<SelectGroupOption>>,
      required: true
    }
  },
  render () {
    const {
      clsPrefix,
      tmNode: { rawNode }
    } = this
    const children = rawNode.render
      ? [rawNode.render(rawNode)]
      : [rawNode.label || (rawNode.name as any)]
    return <div class={`${clsPrefix}-base-select-group-header`}>{children}</div>
  }
})
