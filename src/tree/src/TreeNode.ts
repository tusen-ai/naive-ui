import { h, inject, computed, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import NTreeNodeSwitcher from './TreeNodeSwitcher'
import NTreeNodeCheckbox from './TreeNodeCheckbox'
import NTreeNodeContent from './TreeNodeContent'
import { NFadeInExpandTransition } from '../../_internal'
import type { TreeInjection, TmNode } from './interface'

const TreeNode = defineComponent({
  name: 'NTreeNode',
  props: {
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup (props) {
    const NTree = inject<TreeInjection>('NTree') as TreeInjection
    function handleSwitcherClick (): void {
      const { tmNode } = props
      if (NTree.remote && !tmNode.isLeaf && !tmNode.shallowLoaded) {
        if (!NTree.loadingKeys.includes(tmNode.key)) {
          NTree.loadingKeys.push(tmNode.key)
        }
        const { onLoad } = NTree
        if (onLoad) {
          void onLoad(tmNode.rawNode).then(() => {
            NTree.loadingKeys.splice(
              NTree.loadingKeys.findIndex((key) => key === tmNode.key),
              1
            )
            NTree.handleSwitcherClick(tmNode)
          })
        }
      } else {
        NTree.handleSwitcherClick(tmNode)
      }
    }
    function handleContentClick (e: MouseEvent): void {
      NTree.handleSelect(props.tmNode)
    }
    function handleDragEnter (e: DragEvent): void {
      NTree.handleDragEnter({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragStart (e: DragEvent): void {
      NTree.handleDragStart({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragLeave (e: DragEvent): void {
      NTree.handleDragLeave({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragEnd (e: DragEvent): void {
      NTree.handleDragEnd({
        event: e,
        node: props.tmNode
      })
    }
    function handleDrop (
      e: DragEvent,
      dropPosition: 'bottom' | 'center' | 'top'
    ): void {
      NTree.handleDrop({
        event: e,
        node: props.tmNode,
        dropPosition
      })
    }
    function handleCheck (checked: boolean): void {
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
