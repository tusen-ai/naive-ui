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
    drop: self.handleDrop
  }
  const expanded = self.internalExpandedKeys.includes(node.key)
  const props = {
    data: node,
    expanded,
    selected: self.internalSelectedKeys.includes(node.key),
    draggable: self.draggable,
    drop: self.drop,
    blockNode: self.blockNode
  }
  if (node.isLeaf) {
    return h(NTreeNode, {
      props,
      on: listeners,
      key: node.key
    })
  } else if (node.children) {
    return h(NTreeNode, {
      props,
      on: listeners,
      key: node.key
    }, [h(NTreeChildNodesExpandTransition, {},
      [ expanded
        ? h('ul', {
          staticClass: 'n-tree-children-wrapper'
        }, node.children.map(child => genSingleNode(child, h, self)))
        : null]
    )])
  }
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
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    blockNode: {
      type: Boolean,
      default: true
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
    }
  },
  created () {
    this.treeData = treedOptions(this.data)
  },
  data () {
    return {
      treeData: null,
      internalExpandedKeys: [],
      internalSelectedKeys: [],
      draggingNodeKey: null,
      draggingNode: null,
      dropNodeKey: null,
      expandTimerId: null
    }
  },
  watch: {
    data (newData) {
      this.treeData = treedOptions(newData)
      this.internalExpandedKeys = []
      this.internalSelectedKeys = []
      this.draggingNodeKey = null
      this.draggingNode = null
      this.dropNodeKey = null
      this.expandTimerId = null
    }
  },
  computed: {
    synthesizedExpandedKeys () {
      if (Array.isArray(this.expandedKeys)) {
        return this.expandedKeys
      } else {
        return this.internalExpandedKeys
      }
    },
    synthesizedSelectedKeys () {
      if (Array.isArray(this.selectedKeys)) {
        return this.selectedKeys
      } else {
        return this.internalSelectedKeys
      }
    }
  },
  mounted () {
  },
  methods: {
    handleDrop (node, dropType) {
      const drop = [this.draggingNode, node, dropType]
      if (dropIsValid(drop)) {
        applyDrop(drop)
      }
      this.draggingNodeKey = null
      this.draggingNode = null
      this.dropNodeKey = null
    },
    toggleExpand (node) {
      const index = this.internalExpandedKeys.findIndex(expandNodeId => expandNodeId === node.key)
      if (~index) {
        this.$emit('collapse', node)
        this.internalExpandedKeys.splice(index, 1)
      } else {
        if (!node.isLeaf) {
          this.$emit('expand', node)
          this.internalExpandedKeys.push(node.key)
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
      if (!this.internalExpandedKeys.includes(node.key) && !node.isLeaf) {
        window.clearTimeout(this.expandTimerId)
        this.expandTimerId = window.setTimeout(() => {
          if (this.dropNodeKey === node.key && !this.internalExpandedKeys.includes(node.key)) {
            this.internalExpandedKeys.push(node.key)
            this.$emit('expand')
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
    console.log(this.treeData)
    const lOptions = linkedCascaderOptions(this.treeData, 'multiple-all-options')
    const mOptions = menuOptions(lOptions)[0]
    return h('div', {
      staticClass: 'n-tree'
    }, convertRootedOptionsToVNodeTree(mOptions, h, this))
  }
}
