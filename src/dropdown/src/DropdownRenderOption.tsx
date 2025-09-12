import type { TreeNode } from 'treemate'
import type { DropdownRenderOption } from './interface'
import { defineComponent, h, type PropType } from 'vue'

export default defineComponent({
  name: 'DropdownRenderOption',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode<DropdownRenderOption>>,
      required: true
    }
  },
  render() {
    const {
      rawNode: { render, props }
    } = this.tmNode
    return h('div', props, [render?.()])
  }
})
