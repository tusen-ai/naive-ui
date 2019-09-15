import {
  treedOptions,
  dropIsValid,
  applyDrop,
  linkedCascaderOptions,
  menuOptions
} from '../../../utils/data/menuModel'

import NTreeNode from './TreeNode'
import NTreeChildNodesExpandTransition from './ChildNodesExpandTransition'

function genSingleNode (node, h, self) {
  const listeners = {
    'switcher-click': self.handleSwitcherClick,
    select: self.handleSelect,
    dragenter: self.handleDragEnter,
    dragstart: self.handleDragStart,
    dragleave: self.handleDragLeave,
    drop: self.handleDrop,
    check: self.handleCheck
  }
  const expanded = self.synthesizedExpandedKeys.includes(node.key)
  const props = {
    data: node,
    expanded,
    selected: self.synthesizedSelectedKeys.includes(node.key),
    draggable: self.draggable,
    checkable: self.checkable,
    drop: self.drop,
    blockNode: self.blockNode,
    checked: self.synthesizedCheckedKeys.includes(node.key)
  }
  return h(NTreeNode, {
    props,
    on: listeners,
    key: node.key
  },
  [!node.isLeaf
    ? h(NTreeChildNodesExpandTransition, {
      props: {
        transitionDisabled: self.transitionDisabled
      }
    },
    [
      expanded
        ? h('ul', {
          staticClass: 'n-tree-children-wrapper'
        }, node.children.map(child => genSingleNode(child, h, self)))
        : null
    ]
    )
    : null]
  )
}

function convertRootedOptionsToVNodeTree (root, h, self) {
  return root.children.map(child => genSingleNode(child, h, self))
}

export default {
  name: 'NTree',
  props: {
    data: {
      type: Array,
      default: null
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
    checkedKeys: {
      type: Array,
      default: null
    },
    selectedKeys: {
      type: Array,
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    },
    allowDrop: {
      type: Function,
      default: () => true
    },
    allowDrag: {
      type: Function,
      default: () => true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: ''
    }
  },
  created () {
    this.treeData = treedOptions(this.data)
  },
  data () {
    return {
      treeData: null,
      internalExpandedKeys: [],
      internalCheckedKeys: [],
      internalSelectedKeys: [],
      draggingNodeKey: null,
      draggingNode: null,
      dropNodeKey: null,
      expandTimerId: null,
      transitionDisabled: false
    }
  },
  watch: {
    data (newData) {
      this.treeData = treedOptions(newData)
      this.internalExpandedKeys = []
      this.internalCheckedKeys = []
      this.internalSelectedKeys = []
      this.draggingNodeKey = null
      this.draggingNode = null
      this.dropNodeKey = null
      this.expandTimerId = null
    }
  },
  computed: {
    hasExpandedKeys () {
      return Array.isArray(this.expandedKeys)
    },
    hasSelectedKeys () {
      return Array.isArray(this.selectedKeys)
    },
    hasCheckedKeys () {
      return Array.isArray(this.checkedKeys)
    },
    synthesizedExpandedKeys () {
      if (this.hasExpandedKeys) {
        return this.expandedKeys
      } else {
        return this.internalExpandedKeys
      }
    },
    synthesizedSelectedKeys () {
      if (this.hasSelectedKeys) {
        return this.selectedKeys
      } else {
        return this.internalSelectedKeys
      }
    },
    synthesizedCheckedKeys () {
      if (this.hasCheckedKeys) {
        return this.checkedKeys
      } else {
        return this.internalCheckedKeys
      }
    }
  },
  mounted () {
  },
  methods: {
    disableTransition () {
      this.transitionDisabled = true
    },
    enableTransition () {
      this.transitionDisabled = false
    },
    handleCheck (node, checked) {
      if (!this.hasCheckedKeys) {
        if (checked) {
          this.internalCheckedKeys.push(node.key)
        } else {
          this.internalCheckedKeys.splice(
            this.internalCheckedKeys.findIndex(key => key === node.key),
            1
          )
        }
      }
    },
    handleDrop (node, dropType) {
      const drop = [this.draggingNode, node, dropType]
      if (dropIsValid(drop)) {
        this.disableTransition()
        this.$nextTick().then(() => {
          applyDrop(drop)
          return this.$nextTick()
        }).then(() => {
          this.enableTransition()
        })
      }
      this.draggingNodeKey = null
      this.draggingNode = null
      this.dropNodeKey = null
    },
    toggleExpand (node) {
      const index = this.synthesizedExpandedKeys.findIndex(expandNodeId => expandNodeId === node.key)
      if (~index) {
        this.$emit('collapse', node)
        if (!this.hasExpandedKeys) {
          this.internalExpandedKeys.splice(index, 1)
        }
      } else {
        if (!node.isLeaf) {
          this.$emit('expand', node)
          if (!this.hasExpandedKeys) {
            this.internalExpandedKeys.push(node.key)
          }
        }
      }
    },
    handleSwitcherClick (node) {
      this.toggleExpand(node)
    },
    handleSelect (node) {
      this.$emit('select', node)
      if (this.internalSelectedKeys.includes(node.key)) this.internalSelectedKeys = []
      else this.internalSelectedKeys = [node.key]
    },
    handleDragEnter (node) {
      this.$emit('dragenter', node)
      this.dropNodeKey = node.key
      if (node.key === this.draggingNodeKey) return
      if (!this.synthesizedExpandedKeys.includes(node.key) && !node.isLeaf) {
        window.clearTimeout(this.expandTimerId)
        this.expandTimerId = window.setTimeout(() => {
          if (this.dropNodeKey === node.key && !this.synthesizedExpandedKeys.includes(node.key)) {
            if (!this.hasExpandedKeys) {
              this.internalExpandedKeys.push(node.key)
            }
            this.$emit('expand', node.key)
          }
          this.expandTimerId = null
        }, 600)
      }
    },
    handleDragLeave (node) {
      this.dropNodeKey = null
      this.$emit('dragleave', node)
    },
    handleDragStart (node) {
      this.draggingNodeKey = node.key
      this.draggingNode = node
      this.$emit('dragstart', node)
    }
  },
  render (h) {
    const lOptions = linkedCascaderOptions(this.treeData, 'multiple-all-options')
    const mOptions = menuOptions(lOptions)[0]
    return h('div', {
      staticClass: 'n-tree'
    }, convertRootedOptionsToVNodeTree(mOptions, h, this))
  }
}
