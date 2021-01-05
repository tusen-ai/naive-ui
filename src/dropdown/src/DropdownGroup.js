import { defineComponent, Fragment, h } from 'vue'
import { warn } from '../../_utils'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider.vue'
import NDropdownGroupHeader from './DropdownGroupHeader'
import { isDividerNode, isGroupNode } from './utils'

export default defineComponent({
  name: 'NDropdownGroup',
  props: {
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  render () {
    const { tmNode, parentKey } = this
    const { children } = tmNode
    return h(
      Fragment,
      [
        h(NDropdownGroupHeader, {
          tmNode,
          key: tmNode.key
        })
      ].concat(
        children.map((child) => {
          if (isDividerNode(child.rawNode)) {
            return h(NDropdownDivider, {
              key: child.key
            })
          }
          if (isGroupNode(child.rawNode)) {
            warn(
              'dropdown',
              '`group` node is allowed to be put in `group` node.'
            )
            return null
          }
          return h(NDropdownOption, {
            tmNode: child,
            parentKey,
            key: child.key
          })
        })
      )
    )
  }
})
