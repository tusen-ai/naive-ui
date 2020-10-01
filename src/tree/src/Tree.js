import {
  h
} from 'vue'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import NTreeNode from './TreeNode'
import { isLeaf, isLoaded, getAllKeys, keysWithFilter } from './utils'
import styles from './styles'
import { call } from '../../_utils/vue'
import { warn } from '../../_utils/naive'

export default {
  name: 'Tree',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
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
    },
    onDragEnter: {
      type: [Function, Array],
      default: undefined
    },
    onDragLeave: {
      type: [Function, Array],
      default: undefined
    },
    onDragEnd: {
      type: [Function, Array],
      default: undefined
    },
    onDragStart: {
      type: [Function, Array],
      default: undefined
    },
    onDrop: {
      type: [Function, Array],
      default: undefined
    },
    'onUpdate:expandedKeys': {
      type: [Function, Array],
      default: undefined
    },
    'onUpdate:checkedKeys': {
      type: [Function, Array],
      default: undefined
    },
    'onUpdate:selectedKeys': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onExpandedKeysChange: {
      validator () {
        warn('tree', '`on-expanded-keys-change` is deprecated, please use `on-update:expanded-keys` instead.')
        return true
      },
      default: undefined
    },
    onCheckedKeysChange: {
      validator () {
        warn('tree', '`on-checked-keys-change` is deprecated, please use `on-checked:expanded-keys` instead.')
        return true
      },
      default: undefined
    },
    onSelectedKeysChange: {
      validator () {
        warn('tree', '`on-selected-keys-change` is deprecated, please use `on-update:selected-keys` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      treeData: null,
      internalExpandedKeys: this.defaultExpandAll ? getAllKeys(this.data) : (this.defaultExpandedKeys || []),
      internalCheckedKeys: this.defaultCheckedKeys || [],
      internalSelectedKeys: this.defaultSelectedKeys || [],
      draggingNodeKey: null,
      draggingNode: null,
      droppingNodeKey: null,
      expandTimerId: null,
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
        if (!this.hasExpandedKeys) {
          this.internalExpandedKeys = expandedKeysAfterChange
        }
        this.doExpandedKeysChange(expandedKeysAfterChange)
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
    doExpandedKeysChange (...args) {
      const {
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
        onExpandedKeysChange
      } = this
      if (onUpdateExpandedKeys) call(onUpdateExpandedKeys, ...args)
      if (onExpandedKeysChange) call(onExpandedKeysChange, ...args)
    },
    doCheckedKeysChange (...args) {
      const {
        'onUpdate:checkedKeys': onUpdateCheckedKeys,
        onCheckedKeysChange
      } = this
      if (onUpdateCheckedKeys) call(onUpdateCheckedKeys, ...args)
      if (onCheckedKeysChange) call(onCheckedKeysChange, ...args)
    },
    doSelectedKeysChange (...args) {
      const {
        'onUpdate:selectedKeys': onUpdateSelectedKeys,
        onSelectedKeysChange
      } = this
      if (onUpdateSelectedKeys) call(onUpdateSelectedKeys, ...args)
      if (onSelectedKeysChange) call(onSelectedKeysChange, ...args)
    },
    doDragEnter (...args) {
      const { onDragEnter } = this
      if (onDragEnter) call(onDragEnter, ...args)
    },
    doDragLeave (...args) {
      const { onDragLeave } = this
      if (onDragLeave) call(onDragLeave, ...args)
    },
    doDragEnd (...args) {
      const { onDragEnd } = this
      if (onDragEnd) call(onDragEnd, ...args)
    },
    doDragStart (...args) {
      const { onDragStart } = this
      if (onDragStart) call(onDragStart, ...args)
    },
    doDrop (...args) {
      const { onDrop } = this
      if (onDrop) call(onDrop, ...args)
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
          this.doCheckedKeysChange(this.syntheticCheckedKeys.concat([node.key]))
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
          this.doCheckedKeysChange(checkedKeysAfterChange)
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
          this.doExpandedKeysChange(this.internalExpandedKeys)
        } else {
          const expandedKeysAfterChange = Array.from(this.syntheticExpandedKeys)
          expandedKeysAfterChange.splice(index, 1)
          this.doExpandedKeysChange(
            expandedKeysAfterChange
          )
        }
      } else {
        if (!isLeaf(node)) {
          if (!this.hasExpandedKeys) {
            this.internalExpandedKeys.push(node.key)
            this.doExpandedKeysChange(this.internalExpandedKeys)
          } else {
            this.doExpandedKeysChange(
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
          this.doSelectedKeysChange(selectedKeys)
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
          this.doSelectedKeysChange(selectedKeys)
        }
      } else {
        if (this.hasSelectedKeys) {
          const selectedKeys = this.syntheticSelectedKeys
          if (selectedKeys.includes(node.key)) {
            if (this.cancelable) {
              this.doSelectedKeysChange([])
            }
          } else {
            this.doSelectedKeysChange([node.key])
          }
        } else {
          if (this.internalSelectedKeys.includes(node.key)) {
            if (this.cancelable) {
              this.internalSelectedKeys = []
            }
          } else this.internalSelectedKeys = [node.key]
          this.doSelectedKeysChange([node.key])
        }
      }
    },
    handleDragEnter ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.doDragEnter({ event, node })
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
              this.doExpandedKeysChange(this.internalExpandedKeys)
            } else {
              this.doExpandedKeysChange(this.syntheticExpandedKeys.concat(node.key))
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
      this.doDragLeave({ event, node })
    },
    handleDragEnd ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.doDragEnd({ event, node })
      this.resetDragStatus()
    },
    handleDragStart ({ event, node }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.draggingNodeKey = node.key
      this.draggingNode = node
      this.doDragStart({ event, node })
    },
    handleDrop ({ event, node, dropPosition }) {
      if (!this.draggable || this.disabled || node.disabled) return
      this.doDrop('drop', {
        event,
        node,
        dragNode: this.draggingNode,
        dropPosition
      })
      this.resetDragStatus()
    }
  },
  render () {
    return h('div', {
      class: [
        'n-tree',
        {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme
        }
      ]
    }, this.data.map(child => h(NTreeNode, {
      data: child,
      key: child.key
    })))
  }
}
