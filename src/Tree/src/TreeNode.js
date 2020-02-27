import NTreeNodeSwitcher from './TreeNodeSwitcher.vue'
import NTreeNodeCheckbox from './TreeNodeCheckbox.vue'
import NTreeNodeContent from './TreeNodeContent.vue'
import { isLeaf, isLoaded } from './utils'

export default {
  name: 'NTreeNode',
  inject: {
    NTree: {
      default: null
    }
  },
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
    },
    icon: {
      type: Function,
      default: null
    }
  },
  computed: {
    loading () {
      return this.NTree.loadingKeys.includes(this.data.key)
    },
    highlight () {
      return this.NTree.highlightKeys.includes(this.data.key)
    }
  },
  methods: {
    handleSwitcherClick () {
      const node = this.data
      const NTree = this.NTree
      if (NTree.remote && !isLeaf(node) && !isLoaded(node)) {
        if (!NTree.loadingKeys.includes(node.key)) {
          NTree.loadingKeys.push(node.key)
        }
        NTree.onLoad &&
          NTree.onLoad(node)
            .then(() => {
              NTree.loadingKeys.splice(
                NTree.loadingKeys.find(key => key === node.key),
                1
              )
              this.$emit('switcher-click', node)
            })
      } else {
        this.$emit('switcher-click', node)
      }
    },
    handleContentClick () {
      this.$emit('select', this.data)
    },
    handleDragOver (e) {
      this.$emit('dragover', { event: e, node: this.data })
    },
    handleDragEnter (e) {
      this.$emit('dragenter', { event: e, node: this.data })
    },
    handleDragStart (e) {
      this.$emit('dragstart', { event: e, node: this.data })
    },
    handleDragLeave (e) {
      this.$emit('dragleave', { event: e, node: this.data })
    },
    handleDragEnd (e) {
      this.$emit('dragend', { event: e, node: this.data })
    },
    handleDrop (e, dropPosition) {
      this.$emit('drop', {
        event: e,
        node: this.data,
        dropPosition
      })
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
          loading: this.loading,
          hide: isLeaf(this.data)
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
          checkable: this.checkable,
          highlight: this.highlight
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
      (
        this.icon && typeof this.icon === 'function' ? [this.icon()] : []
      ).concat(this.$slots.default)
    ])
  }
}
