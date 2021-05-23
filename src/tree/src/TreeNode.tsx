/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h, inject, computed, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import NTreeNodeSwitcher from './TreeNodeSwitcher'
import NTreeNodeCheckbox from './TreeNodeCheckbox'
import NTreeNodeContent from './TreeNodeContent'
import { TmNode, treeInjectionKey } from './interface'
import { renderDropMark } from './dnd'
import { repeat } from 'seemly'

const TreeNode = defineComponent({
  name: 'TreeNode',
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
    const {
      droppingNodeParentRef,
      droppingNodeRef,
      draggingNodeRef,
      droppingPositionRef,
      indentRef
    } = NTree
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
    function handleDragStart (e: DragEvent): void {
      NTree.handleDragStart({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragEnter (e: DragEvent): void {
      if (e.currentTarget !== e.target) {
        return
      }
      NTree.handleDragEnter({
        event: e,
        node: props.tmNode
      })
    }
    function handleDragOver (e: DragEvent): void {
      e.preventDefault() // if not prevent, drop event won't be fired...
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
      if (e.currentTarget !== e.target) {
        return
      }
      NTree.handleDragLeave({
        event: e,
        node: props.tmNode
      })
    }
    function handleDrop (e: DragEvent): void {
      e.preventDefault()
      if (droppingPositionRef.value !== null) {
        NTree.handleDrop({
          event: e,
          node: props.tmNode,
          dropPosition: droppingPositionRef.value
        })
      }
    }
    return {
      showDropMark: useMemo(() => {
        const { value: draggingNode } = draggingNodeRef
        if (!draggingNode) return
        const { value: droppingPosition } = droppingPositionRef
        if (!droppingPosition) return
        const { value: droppingNode } = droppingNodeRef
        if (!droppingNode || draggingNode.key === droppingNode.key) return
        const { tmNode } = props
        if (tmNode.key === droppingNode.key) return true
        return false
      }),
      showDropMarkAsParent: useMemo(() => {
        const { value: droppingNodeParent } = droppingNodeParentRef
        if (!droppingNodeParent) return false
        const { tmNode } = props
        const { value: droppingPosition } = droppingPositionRef
        if (droppingPosition === 'before' || droppingPosition === 'after') {
          return droppingNodeParent.key === tmNode.key
        }
        return false
      }),
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
      droppingPosition: droppingPositionRef,
      indent: indentRef,
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
        onDrop: this.handleDrop,
        onDragover: this.handleDragOver
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
          {repeat(
            <div
              class={`${clsPrefix}-tree-node-indent`}
              style={{ flex: `0 0 ${this.indent}px` }}
            />,
            tmNode.level
          )}
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
            onDragstart={
              draggable && blockLine ? undefined : this.handleDragStart
            }
          >
            {{
              default: () => tmNode.rawNode.label
            }}
          </NTreeNodeContent>
          {this.icon ? this.icon() : null}
          {draggable
            ? this.showDropMark
              ? renderDropMark({
                position: this.droppingPosition!,
                level: tmNode.level,
                indent: this.indent
              })
              : this.showDropMarkAsParent
                ? renderDropMark({
                  position: 'inside',
                  level: tmNode.level,
                  indent: this.indent
                })
                : null
            : null}
        </div>
      </div>
    )
  }
})

export default TreeNode
