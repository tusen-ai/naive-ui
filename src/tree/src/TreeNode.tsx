import { h, inject, computed, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import NTreeNodeSwitcher from './TreeNodeSwitcher'
import NTreeNodeCheckbox from './TreeNodeCheckbox'
import NTreeNodeContent from './TreeNodeContent'
import { TmNode, treeInjectionKey } from './interface'

const TreeNode = defineComponent({
  name: 'NTreeNode',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object as PropType<TmNode>,
      required: true
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NTree = inject(treeInjectionKey)!
    function handleSwitcherClick (): void {
      const { tmNode } = props
      if (NTree.remoteRef.value && !tmNode.isLeaf && !tmNode.shallowLoaded) {
        if (!NTree.loadingKeysRef.value.includes(tmNode.key)) {
          NTree.loadingKeysRef.value.push(tmNode.key)
        }
        const {
          onLoadRef: { value: onLoad }
        } = NTree
        if (onLoad) {
          void onLoad(tmNode.rawNode).then(() => {
            NTree.loadingKeysRef.value.splice(
              NTree.loadingKeysRef.value.findIndex((key) => key === tmNode.key),
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
      loading: useMemo(() =>
        NTree.loadingKeysRef.value.includes(props.tmNode.key)
      ),
      highlight: useMemo(() =>
        NTree.highlightKeysRef.value.includes(props.tmNode.key)
      ),
      checked: useMemo(() =>
        NTree.displayedCheckedKeysRef.value.includes(props.tmNode.key)
      ),
      indeterminate: useMemo(() =>
        NTree.displayedIndeterminateKeysRef.value.includes(props.tmNode.key)
      ),
      selected: useMemo(() =>
        NTree.mergedSelectedKeysRef.value.includes(props.tmNode.key)
      ),
      expanded: useMemo(() =>
        NTree.mergedExpandedKeysRef.value.includes(props.tmNode.key)
      ),
      icon: computed(() => props.tmNode.rawNode.icon),
      checkable: NTree.checkableRef,
      draggable: NTree.draggableRef,
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
    const { tmNode, clsPrefix, checkable, selected, highlight } = this
    return (
      <li
        class={[
          `${clsPrefix}-tree-node`,
          {
            [`${clsPrefix}-tree-node--selected`]: selected,
            [`${clsPrefix}-tree-node--checkable`]: checkable,
            [`${clsPrefix}-tree-node--hightlight`]: highlight
          }
        ]}
      >
        {Array.apply(null, { length: tmNode.level } as any).map(() => (
          <div class={`${clsPrefix}-tree-node-indent`}></div>
        ))}
        <NTreeNodeSwitcher
          clsPrefix={clsPrefix}
          expanded={this.expanded}
          loading={this.loading}
          hide={tmNode.isLeaf}
          onClick={this.handleSwitcherClick}
        />
        {checkable ? (
          <NTreeNodeCheckbox
            clsPrefix={clsPrefix}
            checked={this.checked}
            indeterminate={this.indeterminate}
            onCheck={this.handleCheck}
          />
        ) : null}
        <NTreeNodeContent
          clsPrefix={clsPrefix}
          onClick={this.handleContentClick}
          onDragenter={this.handleDragEnter}
          onDragstart={this.handleDragStart}
          onDragleave={this.handleDragLeave}
          onDragend={this.handleDragEnd}
          onDrop={this.handleDrop}
        >
          {{
            default: () => tmNode.rawNode.label
          }}
        </NTreeNodeContent>
        {this.icon ? this.icon() : null}
      </li>
    )
  }
})

export default TreeNode
