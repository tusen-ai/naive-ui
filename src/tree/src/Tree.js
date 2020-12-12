import { h, ref, toRef, computed } from 'vue'
import { createTreeMate } from 'treemate'
import { useMergedState } from 'vooks'
import { configurable, themeable, withCssr } from '../../_mixins'
import NTreeNode from './TreeNode'
import { keysWithFilter } from './utils'
import styles from './styles'
import { call, warn } from '../../_utils'

export default {
  name: 'Tree',
  mixins: [configurable, themeable, withCssr(styles)],
  provide () {
    return { NTree: this }
  },
  props: {
    data: {
      type: Array,
      required: true
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
    disabled: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Array,
      default: undefined
    },
    defaultCheckedKeys: {
      type: Array,
      default: []
    },
    expandedKeys: {
      type: Array,
      default: undefined
    },
    defaultExpandedKeys: {
      type: Array,
      default: []
    },
    selectedKeys: {
      type: Array,
      default: undefined
    },
    defaultSelectedKeys: {
      type: Array,
      default: []
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
        return ~node.label.toLowerCase().indexOf(pattern.toLowerCase())
      }
    },
    onLoad: {
      type: Function,
      default: undefined
    },
    cascade: {
      type: Boolean,
      default: false
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
        warn(
          'tree',
          '`on-expanded-keys-change` is deprecated, please use `on-update:expanded-keys` instead.'
        )
        return true
      },
      default: undefined
    },
    onCheckedKeysChange: {
      validator () {
        warn(
          'tree',
          '`on-checked-keys-change` is deprecated, please use `on-update:expanded-keys` instead.'
        )
        return true
      },
      default: undefined
    },
    onSelectedKeysChange: {
      validator () {
        warn(
          'tree',
          '`on-selected-keys-change` is deprecated, please use `on-update:selected-keys` instead.'
        )
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const treeMateRef = computed(() => createTreeMate(props.data))
    const uncontrolledCheckedKeysRef = ref(
      props.defaultCheckedKeys || props.checkedKeys
    )
    const controlledCheckedKeysRef = toRef(props, 'checkedKeys')
    const mergedCheckedKeysRef = useMergedState(
      controlledCheckedKeysRef,
      uncontrolledCheckedKeysRef
    )
    const checkedStatusRef = computed(() => {
      return treeMateRef.value.getCheckedKeys(mergedCheckedKeysRef.value, {
        cascade: props.cascade
      })
    })
    const displayedCheckedKeysRef = computed(() => {
      return checkedStatusRef.value.checkedKeys
    })
    const displayedIndeterminateKeysRef = computed(() => {
      return checkedStatusRef.value.indeterminateKeys
    })
    const uncontrolledSelectedKeysRef = ref(
      props.defaultSelectedKeys || props.selectedKeys
    )
    const controlledSelectedKeysRef = toRef(props, 'selectedKeys')
    const mergedSelectedKeysRef = useMergedState(
      controlledSelectedKeysRef,
      uncontrolledSelectedKeysRef
    )
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandAll
        ? treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedKeys || props.expandedKeys
    )
    const controlledExpandedKeysRef = toRef(props, 'selectedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    return {
      treeMate: treeMateRef,
      tmNodes: computed(() => treeMateRef.value.treeNodes),
      uncontrolledCheckedKeys: uncontrolledCheckedKeysRef,
      displayedCheckedKeys: displayedCheckedKeysRef,
      displayedIndeterminateKeys: displayedIndeterminateKeysRef,
      uncontrolledSelectedKeys: uncontrolledSelectedKeysRef,
      mergedSelectedKeys: mergedSelectedKeysRef,
      uncontrolledExpandedKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      highlightKeys: ref([]),
      loadingKeys: ref([])
    }
  },
  data () {
    return {
      draggingNodeKey: null,
      draggingNode: null,
      droppingNodeKey: null,
      expandTimerId: null
    }
  },
  watch: {
    data () {
      this.loadingKeys = []
      this.expandTimerId = null
    },
    pattern (value) {
      if (value) {
        const [expandedKeysAfterChange, highlightKeys] = keysWithFilter(
          this.data,
          this.pattern,
          this.filter
        )
        this.highlightKeys = highlightKeys
        this.doExpandedKeysChange(expandedKeysAfterChange)
      } else {
        this.highlightKeys = []
      }
    }
  },
  methods: {
    doExpandedKeysChange (value) {
      const {
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
        onExpandedKeysChange
      } = this
      this.uncontrolledExpandedKeys = value
      if (onUpdateExpandedKeys) call(onUpdateExpandedKeys, value)
      if (onExpandedKeysChange) call(onExpandedKeysChange, value)
    },
    doCheckedKeysChange (value) {
      const {
        'onUpdate:checkedKeys': onUpdateCheckedKeys,
        onCheckedKeysChange
      } = this
      this.uncontrolledCheckedKeys = value
      if (onUpdateCheckedKeys) call(onUpdateCheckedKeys, value)
      if (onCheckedKeysChange) call(onCheckedKeysChange, value)
    },
    doSelectedKeysChange (value) {
      const {
        'onUpdate:selectedKeys': onUpdateSelectedKeys,
        onSelectedKeysChange
      } = this
      this.uncontrolledSelectedKeys = value
      if (onUpdateSelectedKeys) call(onUpdateSelectedKeys, value)
      if (onSelectedKeysChange) call(onSelectedKeysChange, value)
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
      const { checkedKeys } = this.treeMate[checked ? 'check' : 'uncheck'](
        node.key,
        this.displayedCheckedKeys,
        {
          cascade: this.cascade
        }
      )
      this.doCheckedKeysChange(checkedKeys)
    },
    toggleExpand (node) {
      if (this.disabled) return
      const { mergedExpandedKeys } = this
      const index = mergedExpandedKeys.findIndex(
        (expandNodeId) => expandNodeId === node.key
      )
      if (~index) {
        const expandedKeysAfterChange = Array.from(mergedExpandedKeys)
        expandedKeysAfterChange.splice(index, 1)
        this.doExpandedKeysChange(expandedKeysAfterChange)
      } else {
        this.doExpandedKeysChange(mergedExpandedKeys.concat(node.key))
      }
    },
    handleSwitcherClick (node) {
      if (this.disabled || node.disabled) return
      this.toggleExpand(node)
    },
    handleSelect (node) {
      if (this.disabled || node.disabled || !this.selectable) return
      if (this.multiple) {
        const selectedKeys = this.mergedSelectedKeys
        const index = selectedKeys.findIndex((key) => key === node.key)
        if (~index) {
          if (this.cancelable) {
            selectedKeys.splice(index, 1)
          }
        } else if (!~index) {
          selectedKeys.push(node.key)
        }
        this.doSelectedKeysChange(selectedKeys)
      } else {
        const selectedKeys = this.mergedSelectedKeys
        if (selectedKeys.includes(node.key)) {
          if (this.cancelable) {
            this.doSelectedKeysChange([])
          }
        } else {
          this.doSelectedKeysChange([node.key])
        }
      }
    },
    handleDragEnter ({ event, node }) {
      // node should be a tmNode
      if (!this.draggable || this.disabled || node.disabled) return
      this.doDragEnter({ event, node })
      if (!this.expandOnDragenter) return
      this.droppingNodeKey = node.key
      if (node.key === this.draggingNodeKey) return
      if (!this.mergedExpandedKeys.includes(node.key) && !node.isLeaf) {
        window.clearTimeout(this.expandTimerId)
        const expand = () => {
          if (
            this.droppingNodeKey === node.key &&
            !this.mergedExpandedKeys.includes(node.key)
          ) {
            this.doExpandedKeysChange(this.mergedExpandedKeys.concat(node.key))
          }
        }
        if (!node.isShallowLoaded) {
          if (!this.loadingKeys.includes(node.key)) {
            this.loadingKeys.push(node.key)
          }
          this.onLoad(node).then(() => {
            this.loadingKeys.splice(
              this.loadingKeys.find((key) => key === node.key),
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
    const { mergedTheme } = this
    return h(
      'div',
      {
        class: [
          'n-tree',
          {
            [`n-${mergedTheme}-theme`]: mergedTheme
          }
        ]
      },
      this.tmNodes.map((tmNode) =>
        h(NTreeNode, {
          tmNode,
          key: tmNode.key
        })
      )
    )
  }
}
