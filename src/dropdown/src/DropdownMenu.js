import { defineComponent, h } from 'vue'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider.vue'
import NDropdownGroup from './DropdownGroup'
import { isSubmenuNode, isGroupNode, isDividerNode } from './utils'

export default defineComponent({
  name: 'DropdownMenu',
  inject: ['NDropdown'],
  provide () {
    return {
      NDropdownMenu: this
    }
  },
  props: {
    tmNodes: {
      type: Array,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    showIcon () {
      return this.tmNodes.some((tmNode) => {
        const { rawNode } = tmNode
        if (isGroupNode(rawNode)) {
          return !!rawNode.children?.some((rawChild) => rawChild.icon)
        }
        return rawNode.icon
      })
    },
    hasSubmenu () {
      return this.tmNodes.some((tmNode) => {
        const { rawNode } = tmNode
        if (isGroupNode(rawNode)) {
          return !!rawNode.children?.some((rawChild) => isSubmenuNode(rawChild))
        }
        return isSubmenuNode(rawNode)
      })
    }
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
          tmNode,
          parentKey,
          key: tmNode.key
        })
      })
    )
  }
})
