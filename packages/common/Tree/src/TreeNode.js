import NTreeNodeSwitcher from './TreeNodeSwitcher.vue'
import NTreeNodeCheckbox from './TreeNodeCheckbox.vue'
import NTreeNodeContent from './TreeNodeContent.vue'

export default {
  name: 'NTreeNode',
  props: {
    data: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    blockNode: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSwitcherClick () {
      this.$emit('switcher-click', this.data)
    },
    handleContentClick () {
      this.$emit('select', this.data)
    },
    handleDragOver () {
      this.$emit('dragover', this.data)
    },
    handleDragEnter () {
      this.$emit('dragenter', this.data)
    },
    handleDragStart () {
      this.$emit('dragstart', this.data)
    },
    handleDragLeave () {
      this.$emit('dragleave', this.data)
    },
    handleDrop (e, dropPosition) {
      this.$emit('drop', this.data, dropPosition)
    },
    handleCheck (checked) {
      this.$emit('check', this.data, checked)
    }
  },
  render (h) {
    return h('li', {
      staticClass: 'n-tree-node'
    }, [
      h(NTreeNodeSwitcher, {
        props: {
          expanded: this.expanded,
          hide: this.data.isLeaf
        },
        on: {
          click: this.handleSwitcherClick
        }
      }),
      this.checkable ? h(NTreeNodeCheckbox, {
        props: {
          value: this.checked
        },
        on: {
          check: this.handleCheck
        }
      }) : null,
      h(NTreeNodeContent, {
        props: {
          selected: this.selected,
          blockNode: this.blockNode,
          checkable: this.checkable
        },
        domProps: {
          draggable: this.draggable
        },
        on: {
          click: this.handleContentClick,
          dragover: this.handleDragOver,
          dragenter: this.handleDragEnter,
          dragstart: this.handleDragStart,
          dragleave: this.handleDragLeave,
          drop: this.handleDrop
        }
      }, [
        this.data.label
      ]),
      this.$slots.default
    ])
  }
}
