import { defineComponent, Fragment, h, type PropType } from 'vue'
import type { TreeNode } from 'treemate'
import { warn } from '../../_utils'
// eslint-disable-next-line import/no-cycle
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider'
import NDropdownGroupHeader from './DropdownGroupHeader'
import { isDividerNode } from './utils'
import type {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption
} from './interface'

export default defineComponent({
  name: 'NDropdownGroup',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<
      TreeNode<DropdownOption, DropdownGroupOption, DropdownIgnoredOption>
      >,
      required: true
    },
    parentKey: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    }
  },
  render () {
    const { tmNode, parentKey, clsPrefix } = this
    const { children } = tmNode
    return (
      <>
        <NDropdownGroupHeader
          clsPrefix={clsPrefix}
          tmNode={tmNode}
          key={tmNode.key}
        />
        {children?.map((child) => {
          const { rawNode } = child
          if (rawNode.show === false) return null
          if (isDividerNode(rawNode)) {
            return h(NDropdownDivider, {
              clsPrefix,
              key: child.key
            })
          }
          if (child.isGroup) {
            warn(
              'dropdown',
              '`group` node is not allowed to be put in `group` node.'
            )
            return null
          }
          return (
            <NDropdownOption
              clsPrefix={clsPrefix}
              tmNode={child}
              parentKey={parentKey}
              key={child.key}
            />
          )
        })}
      </>
    )
  }
})
