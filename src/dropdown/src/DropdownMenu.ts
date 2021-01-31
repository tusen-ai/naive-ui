import { computed, defineComponent, h, PropType, provide, reactive } from 'vue'
import { TreeNode } from 'treemate'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider'
import NDropdownGroup from './DropdownGroup'
import { isSubmenuNode, isGroupNode, isDividerNode } from './utils'
import {
  DropdownGroup,
  DropdownIgnoredOption,
  DropdownOption
} from './interface'

export interface NDropdownMenuInjection {
  showIcon: boolean
  hasSubmenu: boolean
}

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    tmNodes: {
      type: Array as PropType<
      Array<TreeNode<DropdownOption, DropdownGroup, DropdownIgnoredOption>>
      >,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup (props) {
    provide<NDropdownMenuInjection>(
      'NDropdownMenu',
      reactive({
        showIcon: computed(() => {
          return props.tmNodes.some((tmNode) => {
            const { rawNode } = tmNode
            if (isGroupNode(rawNode)) {
              return !!(rawNode as DropdownGroup).children.some(
                (rawChild) => rawChild.icon
              )
            }
            return rawNode.icon
          })
        }),
        hasSubmenu: computed(() => {
          return props.tmNodes.some((tmNode) => {
            const { rawNode } = tmNode
            if (isGroupNode(rawNode)) {
              return !!(rawNode as DropdownGroup).children.some((rawChild) =>
                isSubmenuNode(rawChild)
              )
            }
            return isSubmenuNode(rawNode)
          })
        })
      })
    )
  },
  render () {
    const { parentKey } = this
    return h(
      'div',
      {
        class: 'n-dropdown-menu'
      },
      this.tmNodes.map((tmNode) => {
        if (isDividerNode(tmNode.rawNode)) {
          return h(NDropdownDivider, {
            key: tmNode.key
          })
        }
        if (isGroupNode(tmNode.rawNode)) {
          return h(NDropdownGroup, {
            tmNode,
            parentKey,
            key: tmNode.key
          })
        }
        return h(NDropdownOption, {
          tmNode: tmNode,
          parentKey,
          key: tmNode.key
        })
      })
    )
  }
})
