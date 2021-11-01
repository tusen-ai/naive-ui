import { h, defineComponent, PropType } from 'vue'
import { TreeNode } from 'treemate'
import { DropdownRenderOption } from './interface'

export default defineComponent({
  name: 'DropdownRenderOption',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode<DropdownRenderOption>>,
      required: true
    }
  },
  render () {
    const {
      rawNode: { render, props }
    } = this.tmNode
    return h('div', props, [render?.()])
  }
})
