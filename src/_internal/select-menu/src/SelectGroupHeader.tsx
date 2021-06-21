import { h, defineComponent, PropType, inject, Ref, VNodeChild } from 'vue'
import { TreeNode } from 'treemate'
import type { SelectGroupOption } from '../../../select/src/interface'
import { render } from '../../../_utils'
import { internalSelectionMenuInjectionKey } from './SelectMenu'
import { RenderLabelImpl } from './interface'

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
  setup () {
    const {
      renderLabelRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(internalSelectionMenuInjectionKey)!
    return {
      renderLabel: renderLabelRef as Ref<RenderLabelImpl | undefined>
    }
  },
  render () {
    const {
      clsPrefix,
      renderLabel,
      tmNode: { rawNode }
    } = this
    let children: VNodeChild
    if (renderLabel) {
      children = renderLabel(rawNode, false)
    } else {
      children = rawNode.render
        ? rawNode.render(rawNode)
        : render(rawNode.label ?? rawNode.name, rawNode)
    }
    return <div class={`${clsPrefix}-base-select-group-header`}>{children}</div>
  }
})
