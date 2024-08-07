import { type PropType, type Ref, defineComponent, h, inject } from 'vue'
import type { TreeNode } from 'treemate'
import type { SelectGroupOption } from '../../../select/src/interface'
import { render } from '../../../_utils'
import {
  type RenderLabelImpl,
  type RenderOptionImpl,
  internalSelectionMenuInjectionKey
} from './interface'

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
  setup() {
    const { renderLabelRef, renderOptionRef, labelFieldRef, nodePropsRef }
      = inject(internalSelectionMenuInjectionKey)!
    return {
      labelField: labelFieldRef,
      nodeProps: nodePropsRef,
      renderLabel: renderLabelRef as Ref<RenderLabelImpl | undefined>,
      renderOption: renderOptionRef as Ref<RenderOptionImpl | undefined>
    }
  },
  render() {
    const {
      clsPrefix,
      renderLabel,
      renderOption,
      nodeProps,
      tmNode: { rawNode }
    } = this
    const attrs = nodeProps?.(rawNode)
    const children = renderLabel
      ? renderLabel(rawNode, false)
      : render(rawNode[this.labelField], rawNode, false)
    const node = (
      <div
        {...attrs}
        class={[`${clsPrefix}-base-select-group-header`, attrs?.class]}
      >
        {children}
      </div>
    )
    return rawNode.render
      ? rawNode.render({ node, option: rawNode })
      : renderOption
        ? renderOption({ node, option: rawNode, selected: false })
        : node
  }
})
