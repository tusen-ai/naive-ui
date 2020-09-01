import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NTreeNode from './TreeNode'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import { isLeaf, isLoaded, getAllKeys, keysWithFilter } from './utils'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

function createNode (node, h, treeInstance) {
  const listeners = {
    'switcher-click': treeInstance.handleSwitcherClick,
    select: treeInstance.handleSelect,
    dragenter: treeInstance.handleDragEnter,
    dragstart: treeInstance.handleDragStart,
    dragleave: treeInstance.handleDragLeave,
    dragend: treeInstance.handleDragEnd,
    drop: treeInstance.handleDrop,
    check: treeInstance.handleCheck
  }
  const expanded = treeInstance.syntheticExpandedKeys.includes(node.key)
  const props = {
    data: node,
    expanded,
    selected: treeInstance.syntheticSelectedKeys.includes(node.key),
    draggable: treeInstance.draggable,
    checkable: treeInstance.checkable,
    drop: treeInstance.drop,
    blockNode: treeInstance.blockNode,
    checked: treeInstance.syntheticCheckedKeys.includes(node.key)
  }
  return h(NTreeNode, {
    props,
    on: listeners,
    key: node.key
  },
  [!isLeaf(node)
    ? h(NFadeInHeightExpandTransition, {
      props: {
        transitionDisabled: treeInstance.transitionDisabled
      }
    },
    [
      expanded && node.children
        ? h('ul', {
          staticClass: 'n-tree-children-wrapper'
        }, node.children.map(child => createNode(child, h, treeInstance)))
        : null
    ]
    )
    : null]
  )
}

function convertOptionsToVNodeTree (options, h, treeInstance) {
  return options.map(child => createNode(child, h, treeInstance))
}

export default {
  name: 'Tree',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  model: {
    prop: 'selected-keys',
    event: 'selected-keys-change'
  },
  provide () {
    return { NTree: this }
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandOnDragenter: {
      type: Boolean,
      default: true
    },
    cancelable: {
      type: Boolean,
      default: true
    },
    checkable: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    blockNode: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultCheckedKeys: {
      type: Array,
      default: null
    },
    expandedKeys: {
      type: Array,
      default: null
    },
    defaultExpandedKeys: {
      type: Array,
      default: null
    },
    selectedKeys: {
      type: Array,
      default: null
    },
    remote: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: ''
    },
    filter: {
      type: Function,
      default: (pattern, node) => {
        if (!pattern) return true
        return ~node.label.toLowerCase().indexOf(
          pattern.toLowerCase()
        )
      }
    },
    onLoad: {
      type: Function,
      default: null
    },
    selectable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.internalCheckedKeys = this.defaultCheckedKeys || []
    this.internalExpandedKeys = this.defaultExpandedKeys || []
    this.internalSelectedKeys = this.defaultSelectedKeys || []
    if (this.defaultExpandAll) {
      this.internalExpandedKeys = getAllKeys(this.data)
      // console.log('getAllKeys(this.data)', getAllKeys(this.data))
    }
  },
  data () {
    return {
      treeData: null,
      internalExpandedKeys: [],
      internalCheckedKeys: [],
      internalSelectedKeys: [],
      draggingNodeKey: null,
      draggingNode: null,
      droppingNodeKey: null,
      expandTimerId: null,
      transitionDisabled: false,
      highlightKeys: [],
      loadingKeys: []
    }
  },
  watch: {
    data () {
      this.internalExpandedKeys = []
      this.internalCheckedKeys = []
      this.internalSelectedKeys = []
      this.loadingKeys = []
      this.expandTimerId = null
    },
    pattern (value) {
      if (value) {
        const [
          expandedKeysAfterChange,
          highlightKeys
        ] = keysWithFilter(
          this.data,
          this.pattern,
          this.filter
        )
        this.highlightKeys = highlightKeys
        // console.log(highlightKeys)
        if (!this.hasExpandedKeys) {
          this.internalExpandedKeys = expandedKeysAfterChange
        }
        this.$emit('expanded-keys-change', expandedKeysAfterChange)
      } else {
        this.highlightKeys = []
      }
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
    syntheticExpandedKeys () {
      if (this.hasExpandedKeys) {
        return this.expandedKeys
      } else {
        return this.internalExpandedKeys
      }
    },
    syntheticSelectedKeys () {
      if (this.hasSelectedKeys) {
        return this.selectedKeys
      } else {
        return this.internalSelectedKeys
      }
    },
    syntheticCheckedKeys () {
      if (this.hasCheckedKeys) {
        return this.checkedKeys
      } else {
        return this.internalCheckedKeys
      }
    }
  },
  methods: {
    disableTransition () {
      this.transitionDisabled = true
    },
    enableTransition () {
      this.transitionDisabled = false
    },
    resetDragStatus () {
      this.draggingNodeKey = null
      this.draggingNode = null
      this.droppingNodeKey = null
    },
    handleCheck (node, checked) {
      if (this.disabled || node.disabled) return
      if (checked) {
        if (this.hasCheckedKeys) {
          this.$emit('checked-keys-change', this.syntheticCheckedKeys.concat([node.key]))
        } else {
          this.internalCheckedKeys.push(node.key)
        }
      } else {
        if (this.hasCheckedKeys) {
          const checkedKeysAfterChange = this.syntheticCheckedKeys
          checkedKeysAfterChange.splice(
            checkedKeysAfterChange.findIndex(key => key === node.key),
            1
          )
          this.$emit('checked-keys-change', checkedKeysAfterChange)
        } else {
          this.internalCheckedKeys.splice(
            this.internalCheckedKeys.findIndex(key => key === node.key),
            1
          )
        }
      }
    },
    toggleExpand (node) {
      if (this.disabled) return
      const index = this.syntheticExpandedKeys
        .findIndex(expandNodeId => expandNodeId === node.key)
      if (~index) {
        if (!this.hasExpandedKeys) {
          this.internalExpandedKeys.splice(index, 1)
          this.$emit('expanded-keys-change', this.internalExpandedKeys)
        } else {
          const expandedKeysAfterChange = Array.from(this.syntheticExpandedKeys)
          expandedKeysAfterChange.splice(index, 1)
          this.$emit(
            'expanded-keys-change',
            expandedKeysAfterChange
          )
        }
      } else {
        if (!isLeaf(node)) {
          if (!this.hasExpandedKeys) {
            this.internalExpandedKeys.push(node.key)
            this.$emit('expanded-keys-change', this.internalExpandedKeys)
          } else {
            this.$emit(
              'expanded-keys-change',
              this.syntheticExpandedKeys.concat(node.key)
            )
          }
        }
      }
    },
    handleSwitcherClick (node) {
      if (this.disabled || node.disabled) return
      this.toggleExpand(node)
    },
    handleSelect (node) {
      if (this.disabled || node.disabled || !this.selectable) return
      if (this.multiple) {
        if (this.hasSelectedKeys) {
          const selectedKeys = this.syntheticSelectedKeys
          const index = selectedKeys.findIndex(key => key === node.key)
          if (~index) {
            if (this.cancelable) {
              selectedKeys.splice(
                index,
                1
              )
            }
          } else if (!~index) {
            selectedKeys.push(node.key)
          }
          this.$emit('selected-keys-change', selectedKeys)
        } else {
          const selectedKeys = this.internalSelectedKeys
          const index = selectedKeys.findIndex(key => key === node.key)
          if (~index) {
            if (this.cancelable) {
              selectedKeys.splice(
                index,
                1
              )
            }
          } else {
            selectedKeys.push(node.key)
          }
          this.$emit('selected-keys-change', selectedKeys)
        }
      } else {
        if (this.hasSelectedKeys) {
          const selectedKeys = this.syntheticSelectedKeys
          if (selectedKeys.includes(node.key)) {
            if (this.cancelable) {
              this.$emit('selected-keys-change', [])
            }
          } else {
            this.$emit('selected-keys-change', [node.key])
          }
        } else {
          if (this.internalSelectedKeys.includes(node.key)) {
            if (this.cancelable) {
              this.internalSelectedKeys = []
            }
          } else this.internalSelectedKeys = [node.key]
          this.$emit('selected-keys-change', [node.key])
        }
      }
    },
    handleDragEnter ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.$emit('dragenter', { event, node })
      if (!this.expandOnDragenter) return
      this.droppingNodeKey = node.key
      if (node.key === this.draggingNodeKey) return
      if (
        !this.syntheticExpandedKeys.includes(node.key) &&
        !isLeaf(node)
      ) {
        window.clearTimeout(this.expandTimerId)
        const expand = () => {
          if (
            this.droppingNodeKey === node.key &&
            !this.syntheticExpandedKeys.includes(node.key)
          ) {
            if (!this.hasExpandedKeys) {
              this.internalExpandedKeys.push(node.key)
              this.$emit('expanded-keys-change', this.internalExpandedKeys)
            } else {
              this.$emit('expanded-keys-change', this.syntheticExpandedKeys.concat(node.key))
            }
          }
        }
        if (!isLoaded(node)) {
          if (!this.loadingKeys.includes(node.key)) {
            this.loadingKeys.push(node.key)
          }
          this
            .onLoad(node)
            .then(() => {
              this.loadingKeys.splice(
                this.loadingKeys.find(key => key === node.key),
                1
              )
              expand()
            })
          return
        }
        this.expandTimerId = window.setTimeout(() => {
          expand()
          this.expandTimerId = null
        }, 800)
      }
    },
    handleDragLeave ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.droppingNodeKey = null
      this.$emit('dragleave', { event, node })
    },
    handleDragEnd ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.$emit('dragend', { event, node })
      this.resetDragStatus()
    },
    handleDragStart ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.draggingNodeKey = node.key
      this.draggingNode = node
      this.$emit('dragstart', { event, node })
    },
    handleDrop ({ event, node, dropPosition }) {
      if (!this.draggable || this.disabled || node.disabled) return
      const drop = {
        event,
        node,
        dragNode: this.draggingNode,
        dropPosition
      }
      this.$emit('drop', drop)
      this.resetDragStatus()
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-tree',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
      }
    }, convertOptionsToVNodeTree(this.data, h, this))
  }
}
