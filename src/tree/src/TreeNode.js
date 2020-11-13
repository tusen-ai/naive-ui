import { h, inject, computed } from 'vue'
import { useMemo } from 'vooks'
import NTreeNodeSwitcher from './TreeNodeSwitcher.vue'
import NTreeNodeCheckbox from './TreeNodeCheckbox.vue'
import NTreeNodeContent from './TreeNodeContent.vue'
import { NFadeInExpandTransition } from '../../_base'

const TreeNode = {
  name: 'NTreeNode',
  inject: {
    NTree: {
      default: null
    }
  },
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const NTree = inject('NTree')
    return {
      loading: useMemo(() => NTree.loadingKeys.includes(props.tmNode.key)),
      highlight: useMemo(() => NTree.highlightKeys.includes(props.tmNode.key)),
      checked: useMemo(() => NTree.displayedCheckedKeys.includes(props.tmNode.key)),
      indeterminate: useMemo(() => NTree.displayedIndeterminateKeys.includes(props.tmNode.key)),
      selected: useMemo(() => NTree.mergedSelectedKeys.includes(props.tmNode.key)),
      expanded: useMemo(() => NTree.mergedExpandedKeys.includes(props.tmNode.key)),
      icon: computed(() => props.tmNode.rawNode.icon)
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
      const { NTree, tmNode } = this
      if (NTree.remote && !tmNode.isLeaf && !tmNode.isShallowLoaded) {
        if (!NTree.loadingKeys.includes(tmNode.key)) {
          NTree.loadingKeys.push(tmNode.key)
        }
        NTree.onLoad &&
          NTree.onLoad(tmNode.rawNode)
            .then(() => {
              NTree.loadingKeys.splice(
                NTree.loadingKeys.find(key => key === tmNode.key),
                1
              )
              this.doSwitcherClick(tmNode.rawNode)
            })
      } else {
        this.doSwitcherClick(tmNode.rawNode)
      }
    },
    handleContentClick () {
      this.doSelect(this.tmNode.rawNode)
    },
    handleDragOver (e) {
      this.doDragOver({ event: e, node: this.tmNode.rawNode })
    },
    handleDragEnter (e) {
      this.doDragEnter({ event: e, node: this.tmNode.rawNode })
    },
    handleDragStart (e) {
      this.doDragStart({ event: e, node: this.tmNode.rawNode })
    },
    handleDragLeave (e) {
      this.doDragLeave({ event: e, node: this.tmNode.rawNode })
    },
    handleDragEnd (e) {
      this.doDragEnd({ event: e, node: this.tmNode.rawNode })
    },
    handleDrop (e, dropPosition) {
      this.doDrop({
        event: e,
        node: this.tmNode.rawNode,
        dropPosition
      })
    },
    handleCheck (checked) {
      this.doCheck(this.tmNode.rawNode, checked)
    }
  },
  render () {
    const { tmNode } = this
    return h('li', {
      class: 'n-tree-node'
    }, [
      h(NTreeNodeSwitcher, {
        expanded: this.expanded,
        loading: this.loading,
        hide: tmNode.isLeaf,
        onClick: this.handleSwitcherClick
      }),
      this.NTree.checkable ? h(NTreeNodeCheckbox, {
        checked: this.checked,
        indeterminate: this.indeterminate,
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
        default: () => tmNode.rawNode.label
      }),
      this.icon ? this.icon() : null,
      !tmNode.isLeaf ? h(NFadeInExpandTransition, null,
        {
          default: () => this.expanded && tmNode.children
            ? h('ul', {
              class: 'n-tree-children-wrapper'
            }, tmNode.children.map(child => h(TreeNode, { tmNode: child, key: child.key })))
            : null
        }) : null
    ])
  }
}

export default TreeNode
