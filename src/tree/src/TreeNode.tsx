import { h, inject, computed, defineComponent, PropType, ref } from 'vue'
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

    function handleCheck (checked: boolean): void {
      NTree.handleCheck(props.tmNode, checked)
    }
    // Dnd
    const pendingPositionRef = ref<'top' | 'center' | 'bottom' | null>(null)
    function handleDragStart (e: DragEvent): void {
      NTree.handleDragStart({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragEnter (e: DragEvent): void {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        (e.currentTarget as HTMLElement).contains(
          e.relatedTarget as HTMLElement
        )
      ) {
        return
      }
      NTree.handleDragEnter({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragOver (e: DragEvent): void {
      e.preventDefault()
      const el = e.currentTarget as HTMLElement
      const elOffsetHeight = el.offsetHeight // dangerous
      const elClientTop = el.getBoundingClientRect().top
      const eventOffsetY = e.clientY - elClientTop
      if (eventOffsetY <= 8) {
        pendingPositionRef.value = 'top'
      } else if (eventOffsetY >= elOffsetHeight - 8) {
        pendingPositionRef.value = 'bottom'
      } else {
        pendingPositionRef.value = 'center'
      }
      NTree.handleDragOver({
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
    function handleDragLeave (e: DragEvent): void {
      if (
        e.currentTarget &&
        e.relatedTarget &&
        (e.currentTarget as HTMLElement).contains(
          e.relatedTarget as HTMLElement
        )
      ) {
        return
      }
      NTree.handleDragLeave({
        event: e,
        node: props.tmNode
      })
    }
    function handleDrop (e: DragEvent): void {
      e.preventDefault()
      if (pendingPositionRef.value !== null) {
        const dropPosition = ({
          top: 'top',
          bottom: 'bottom',
          center: 'center'
        } as const)[pendingPositionRef.value]
        NTree.handleDrop({
          event: e,
          node: props.tmNode,
          dropPosition
        })
      }
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
      blockLine: NTree.blockLineRef,
      pendingPosition: pendingPositionRef,
      handleCheck,
      handleDrop,
      handleDragStart,
      handleDragEnter,
      handleDragOver,
      handleDragEnd,
      handleDragLeave,
      handleContentClick,
      handleSwitcherClick
    }
  },
  render () {
    const {
      tmNode,
      clsPrefix,
      checkable,
      selected,
      highlight,
      draggable,
      blockLine
    } = this
    // drag start not inside
    // it need to be append to node itself, not wrapper
    const dragEventHandlers = draggable
      ? {
        onDragenter: this.handleDragEnter,
        onDragleave: this.handleDragLeave,
        onDragend: this.handleDragEnd,
        onDrop: this.handleDrop
      }
      : undefined
    return (
      <div
        class={`${clsPrefix}-tree-node-wrapper`}
        {...(blockLine ? dragEventHandlers : undefined)}
      >
        <div
          class={[
            `${clsPrefix}-tree-node`,
            {
              [`${clsPrefix}-tree-node--selected`]: selected,
              [`${clsPrefix}-tree-node--checkable`]: checkable,
              [`${clsPrefix}-tree-node--hightlight`]: highlight
            }
          ]}
          draggable={draggable && blockLine}
          onDragstart={
            draggable && blockLine ? this.handleDragStart : undefined
          }
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
            onDragstart={this.handleDragStart}
            {...(!blockLine ? dragEventHandlers : undefined)}
          >
            {{
              default: () => tmNode.rawNode.label
            }}
          </NTreeNodeContent>
          {this.icon ? this.icon() : null}
        </div>
      </div>
    )
  }
})

export default TreeNode
