import { h } from 'vue'
import NDropdownOption from './DropdownOption'
import NDropdownDivider from './DropdownDivider.vue'
import { isSubmenuNode } from './utils'

export default {
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
      require: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    showIcon () {
      return this.tmNodes.some(tmNode => tmNode.rawNode.icon)
    },
    showSubmenu () {
      return this.tmNodes.some(tmNode => isSubmenuNode(tmNode.rawNode))
    }
  },
  render () {
    const {
      NDropdown: {
        size
      }
    } = this
    return h('div', {
      class: [
        'n-dropdown-menu',
        `n-dropdown-menu--${size}-size`
      ]
    },
    [
      this.tmNodes.map(tmNode => {
        if (tmNode.rawNode.type === 'divider') {
          return h(NDropdownDivider, {
            key: tmNode.key
          })
        }
        return h(NDropdownOption, {
          tmNode: tmNode,
          parentKey: this.parentKey,
          key: tmNode.key
        })
      })
    ])
  }
}
