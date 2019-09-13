import NTreeNodeSwitcher from './switcher.vue'
import NTreeNodeCheckbox from './checkbox.vue'
import NTreeNodeContent from './content.vue'

export default {
  name: 'NTreeNode',
  props: {
    data: {
      type: Object,
      required: true
    },
    expand: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSwitcherClick () {
      this.$emit('click', this.data)
    }
  },
  render (h) {
    return h('li', {
      staticClass: 'n-tree-node'
    }, [
      h(NTreeNodeSwitcher, {
        props: {
          expand: this.expand,
          hide: this.data.isLeaf
        },
        on: {
          click: this.handleSwitcherClick
        }
      }),
      this.showCheckbox ? h(NTreeNodeCheckbox) : null,
      h(NTreeNodeContent, {
        domProps: {
          draggable: this.draggable
        }
      }, [
        this.data.label
      ]),
      this.$slots.default
    ])
  }
}
