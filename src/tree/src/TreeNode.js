import { h } from 'vue'
import NTreeNodeSwitcher from './TreeNodeSwitcher.vue'
import NTreeNodeCheckbox from './TreeNodeCheckbox.vue'
import NTreeNodeContent from './TreeNodeContent.vue'
import { NFadeInExpandTransition } from '../../_base'

import { isLeaf, isLoaded } from './utils'

const TreeNode = {
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
    }
  },
  computed: {
    loading () {
      return this.NTree.loadingKeys.includes(this.data.key)
    },
    highlight () {
      return this.NTree.highlightKeys.includes(this.data.key)
    },
    checked () {
      return this.NTree.syntheticCheckedKeys.includes(this.data.key)
    },
    selected () {
      return this.NTree.syntheticSelectedKeys.includes(this.data.key)
    },
    expanded () {
      return this.NTree.syntheticExpandedKeys.includes(this.data.key)
    },
    icon () {
      const {
        data: {
          icon
        }
      } = this
      return typeof icon === 'function' ? icon : null
    }
  },
  methods: {
    doDragStart (...args) {
      const { NTree: { handleDragStart } } = this
      if (handleDragStart) handleDragStart(...args)
    },
    doDragEnter (...args) {
      const { NTree: { handleDragEnter } } = this
      if (handleDragEnter) handleDragEnter(...args)
    },
    doDragEnd (...args) {
      const { NTree: { handleDragEnd } } = this
      if (handleDragEnd) handleDragEnd(...args)
    },
    doDragLeave (...args) {
      const { NTree: { handleDragLeave } } = this
      if (handleDragLeave) handleDragLeave(...args)
    },
    doDragOver (...args) {
      const { NTree: { handleDragOver } } = this
      if (handleDragOver) handleDragOver(...args)
    },
    doDrop (...args) {
      const { NTree: { handleDrop } } = this
      if (handleDrop) handleDrop(...args)
    },
    doSwitcherClick (...args) {
      const { NTree: { handleSwitcherClick } } = this
      if (handleSwitcherClick) handleSwitcherClick(...args)
    },
    doCheck (...args) {
      const { NTree: { handleCheck } } = this
      if (handleCheck) handleCheck(...args)
    },
    doSelect (...args) {
      const { NTree: { handleSelect } } = this
      if (handleSelect) handleSelect(...args)
    },
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
              this.doSwitcherClick(node)
            })
      } else {
        this.doSwitcherClick(node)
      }
    },
    handleContentClick () {
      this.doSelect(this.data)
    },
    handleDragOver (e) {
      this.doDragOver({ event: e, node: this.data })
    },
    handleDragEnter (e) {
      this.doDragEnter({ event: e, node: this.data })
    },
    handleDragStart (e) {
      this.doDragStart({ event: e, node: this.data })
    },
    handleDragLeave (e) {
      this.doDragLeave({ event: e, node: this.data })
    },
    handleDragEnd (e) {
      this.doDragEnd({ event: e, node: this.data })
    },
    handleDrop (e, dropPosition) {
      this.doDrop({
        event: e,
        node: this.data,
        dropPosition
      })
    },
    handleCheck (checked) {
      this.doCheck(this.data, checked)
    }
  },
  render () {
    const { data } = this
    return h('li', {
      class: 'n-tree-node'
    }, [
      h(NTreeNodeSwitcher, {
        expanded: this.expanded,
        loading: this.loading,
        hide: isLeaf(data),
        onClick: this.handleSwitcherClick
      }),
      this.NTree.checkable ? h(NTreeNodeCheckbox, {
        value: this.checked,
        onCheck: this.handleCheck
      }) : null,
      h(NTreeNodeContent, {
        selected: this.selected,
        blockNode: this.NTree.blockNode,
        checkable: this.NTree.checkable,
        highlight: this.highlight,
        draggable: this.NTree.draggable,
        onClick: this.handleContentClick,
        onDragover: this.handleDragOver,
        onDragenter: this.handleDragEnter,
        onDragstart: this.handleDragStart,
        onDragleave: this.handleDragLeave,
        onDrop: this.handleDrop
      }, {
        default: () => data.label
      }),
      this.icon ? this.icon() : null,
      !isLeaf(data) ? h(NFadeInExpandTransition, null,
        {
          default: () => this.expanded && data.children
            ? h('ul', {
              class: 'n-tree-children-wrapper'
            }, data.children.map(child => h(TreeNode, { data: child, key: child.key })))
            : null
        }) : null
    ])
  }
}

export default TreeNode
