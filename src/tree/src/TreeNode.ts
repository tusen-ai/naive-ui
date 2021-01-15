import { h, inject, computed, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import { TreeNode, KeyedRawNode } from 'treemate'
import NTreeNodeSwitcher from './TreeNodeSwitcher.vue'
import NTreeNodeCheckbox from './TreeNodeCheckbox.vue'
import NTreeNodeContent from './TreeNodeContent.vue'
import { NFadeInExpandTransition } from '../../_base'
import type { TreeInjection } from './Tree'

const TreeNode = defineComponent({
  name: 'NTreeNode',
  props: {
    tmNode: {
      type: Object as PropType<TreeNode>,
      required: true
    }
  },
  setup (props) {
    const NTree = inject<TreeInjection>('NTree') as TreeInjection
    function handleSwitcherClick () {
      const { tmNode } = props
      if (NTree.remote && !tmNode.isLeaf && !tmNode.isShallowLoaded) {
        if (!NTree.loadingKeys.includes(tmNode.key)) {
          NTree.loadingKeys.push(tmNode.key)
        }
        NTree.onLoad &&
          NTree.onLoad(tmNode.rawNode as KeyedRawNode).then(() => {
            NTree.loadingKeys.splice(
              NTree.loadingKeys.findIndex((key) => key === tmNode.key),
              1
            )
            NTree.handleSwitcherClick(tmNode)
          })
      } else {
        NTree.handleSwitcherClick(tmNode)
      }
    }
    function handleContentClick () {
      NTree.handleSelect(props.tmNode)
    }
    function handleDragEnter (e: DragEvent) {
      NTree.handleDragEnter({
        event: e,
        node: props.tmNode.rawNode as KeyedRawNode
      })
    }
    function handleDragStart (e: DragEvent) {
      NTree.handleDragStart({
        event: e,
        node: props.tmNode.rawNode as KeyedRawNode
      })
    }
    function handleDragLeave (e: DragEvent) {
      NTree.handleDragLeave({
        event: e,
        node: props.tmNode.rawNode as KeyedRawNode
      })
    }
    function handleDragEnd (e: DragEvent) {
      NTree.handleDragEnd({
        event: e,
        node: props.tmNode.rawNode as KeyedRawNode
      })
    }
    function handleDrop (
      e: DragEvent,
      dropPosition: 'top' | 'center' | 'bottom'
    ) {
      NTree.handleDrop({
        event: e,
        node: props.tmNode.rawNode as KeyedRawNode,
        dropPosition
      })
    }
    function handleCheck (checked: boolean) {
      NTree.handleCheck(props.tmNode, checked)
    }
    return {
      NTree,
      loading: useMemo(() => NTree.loadingKeys.includes(props.tmNode.key)),
      highlight: useMemo(() => NTree.highlightKeys.includes(props.tmNode.key)),
      checked: useMemo(() =>
        NTree.displayedCheckedKeys.includes(props.tmNode.key)
      ),
      indeterminate: useMemo(() =>
        NTree.displayedIndeterminateKeys.includes(props.tmNode.key)
      ),
      selected: useMemo(() =>
        NTree.mergedSelectedKeys.includes(props.tmNode.key)
      ),
      expanded: useMemo(() =>
        NTree.mergedExpandedKeys.includes(props.tmNode.key)
      ),
      icon: computed(() => props.tmNode.rawNode.icon),
      handleCheck,
      handleDrop,
      handleDragStart,
      handleDragEnter,
      handleDragEnd,
      handleDragLeave,
      handleContentClick,
      handleSwitcherClick
    }
  },
  render () {
    const { tmNode } = this
    return h(
      'li',
      {
        class: 'n-tree-node'
      },
      [
        h(NTreeNodeSwitcher, {
          expanded: this.expanded,
          loading: this.loading,
          hide: tmNode.isLeaf,
          onClick: this.handleSwitcherClick
        }),
        this.NTree.checkable
          ? h(NTreeNodeCheckbox, {
            checked: this.checked,
            indeterminate: this.indeterminate,
            onCheck: this.handleCheck
          })
          : null,
        h(
          NTreeNodeContent,
          {
            selected: this.selected,
            blockNode: this.NTree.blockNode,
            checkable: this.NTree.checkable,
            highlight: this.highlight,
            draggable: this.NTree.draggable,
            onClick: this.handleContentClick,
            onDragenter: this.handleDragEnter,
            onDragstart: this.handleDragStart,
            onDragleave: this.handleDragLeave,
            onDragEnd: this.handleDragEnd,
            onDrop: this.handleDrop
          },
          {
            default: () => tmNode.rawNode.label
          }
        ),
        this.icon ? this.icon() : null,
        !tmNode.isLeaf
          ? h(NFadeInExpandTransition, null, {
            default: () =>
              this.expanded && tmNode.children
                ? h(
                  'ul',
                  {
                    class: 'n-tree-children-wrapper'
                  },
                  tmNode.children.map((child) =>
                    h(TreeNode, { tmNode: child, key: child.key })
                  )
                )
                : null
          })
          : null
      ]
    )
  }
})

export default TreeNode
