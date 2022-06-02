import { h, defineComponent, PropType, inject, Ref } from 'vue'
import { TreeNode } from 'treemate'
import type { SelectGroupOption } from '../../../select/src/interface'
import { render } from '../../../_utils'
import {
  internalSelectionMenuInjectionKey,
  RenderLabelImpl,
  RenderOptionImpl
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
  setup () {
    const {
      renderLabelRef,
      renderOptionRef,
      labelFieldRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(internalSelectionMenuInjectionKey)!
    return {
      labelField: labelFieldRef,
      renderLabel: renderLabelRef as Ref<RenderLabelImpl | undefined>,
      renderOption: renderOptionRef as Ref<RenderOptionImpl | undefined>
    }
  },
  render () {
    const {
      clsPrefix,
      renderLabel,
      renderOption,
      tmNode: { rawNode }
    } = this
    const children = renderLabel
      ? renderLabel(rawNode, false)
      : render(rawNode[this.labelField], rawNode, false)
    const node = (
      <div class={`${clsPrefix}-base-select-group-header`}>{children}</div>
    )
    return rawNode.render
      ? rawNode.render({ node, option: rawNode })
      : renderOption
        ? renderOption({ node, option: rawNode, selected: false })
        : node
  }
})
