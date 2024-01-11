import { inject, ref, type Ref } from 'vue'
import { type TreeNode } from 'treemate'
import {
  type TreeOverrideNodeClickBehavior,
  type Key,
  type TmNode,
  type TreeOption,
  type TreeOverrideNodeClickBehaviorReturn
} from './interface'
import { treeSelectInjectionKey } from '../../tree-select/src/interface'

export function useKeyboard ({
  props,
  fNodesRef,
  mergedExpandedKeysRef,
  mergedSelectedKeysRef,
  mergedCheckedKeysRef,
  handleCheck,
  handleSelect,
  handleSwitcherClick
}: {
  props: {
    keyboard: boolean
    overrideDefaultNodeClickBehavior: TreeOverrideNodeClickBehavior | undefined
  }
  fNodesRef: Ref<Array<TreeNode<TreeOption>>>
  mergedExpandedKeysRef: Ref<Key[]>
  mergedSelectedKeysRef: Ref<Key[]>
  mergedCheckedKeysRef: Ref<Key[]>
  handleSelect: (node: TmNode) => void
  handleSwitcherClick: (node: TmNode) => void
  handleCheck: (node: TmNode, checked: boolean) => void
}): {
    pendingNodeKeyRef: Ref<null | Key>
    handleKeydown: (e: KeyboardEvent) => {
      enterBehavior: TreeOverrideNodeClickBehaviorReturn | null
    }
  } {
  const { value: mergedSelectedKeys } = mergedSelectedKeysRef

  // If it's used in tree-select, make it take over pending state
  const treeSelectInjection = inject(treeSelectInjectionKey, null)
  const pendingNodeKeyRef = treeSelectInjection
    ? treeSelectInjection.pendingNodeKeyRef
    : ref<null | Key>(
      mergedSelectedKeys.length
        ? mergedSelectedKeys[mergedSelectedKeys.length - 1]
        : null
    )
  function handleKeydown (e: KeyboardEvent): {
    enterBehavior: TreeOverrideNodeClickBehaviorReturn | null
  } {
    if (!props.keyboard) return { enterBehavior: null }
    const { value: pendingNodeKey } = pendingNodeKeyRef
    let enterBehavior: TreeOverrideNodeClickBehaviorReturn | null = null
    if (pendingNodeKey === null) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
      }
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (pendingNodeKey === null) {
          const { value: fNodes } = fNodesRef
          let fIndex = 0
          while (fIndex < fNodes.length) {
            if (!fNodes[fIndex].disabled) {
              pendingNodeKeyRef.value = fNodes[fIndex].key
              break
            }
            fIndex += 1
          }
        }
      }
    } else {
      const { value: fNodes } = fNodesRef
      let fIndex = fNodes.findIndex((tmNode) => tmNode.key === pendingNodeKey)
      if (!~fIndex) return { enterBehavior: null }
      if (e.key === 'Enter') {
        const tmNode = fNodes[fIndex]
        enterBehavior =
          props.overrideDefaultNodeClickBehavior?.({
            option: tmNode.rawNode
          }) || null
        switch (enterBehavior) {
          case 'toggleCheck':
            handleCheck(
              tmNode,
              !mergedCheckedKeysRef.value.includes(tmNode.key)
            )
            break
          case 'toggleSelect':
            handleSelect(tmNode)
            break
          case 'toggleExpand':
            handleSwitcherClick(tmNode)
            break
          case 'none':
            break
          case 'default':
          default:
            enterBehavior = 'default'
            handleSelect(tmNode)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        fIndex += 1
        while (fIndex < fNodes.length) {
          if (!fNodes[fIndex].disabled) {
            pendingNodeKeyRef.value = fNodes[fIndex].key
            break
          }
          fIndex += 1
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        fIndex -= 1
        while (fIndex >= 0) {
          if (!fNodes[fIndex].disabled) {
            pendingNodeKeyRef.value = fNodes[fIndex].key
            break
          }
          fIndex -= 1
        }
      } else if (e.key === 'ArrowLeft') {
        const pendingNode = fNodes[fIndex]
        if (
          pendingNode.isLeaf ||
          !mergedExpandedKeysRef.value.includes(pendingNodeKey)
        ) {
          const parentTmNode = pendingNode.getParent()
          if (parentTmNode) {
            pendingNodeKeyRef.value = parentTmNode.key
          }
        } else {
          handleSwitcherClick(pendingNode)
        }
      } else if (e.key === 'ArrowRight') {
        const pendingNode = fNodes[fIndex]
        if (pendingNode.isLeaf) return { enterBehavior: null }
        if (!mergedExpandedKeysRef.value.includes(pendingNodeKey)) {
          handleSwitcherClick(pendingNode)
        } else {
          // Tha same as ArrowDown
          fIndex += 1
          while (fIndex < fNodes.length) {
            if (!fNodes[fIndex].disabled) {
              pendingNodeKeyRef.value = fNodes[fIndex].key
              break
            }
            fIndex += 1
          }
        }
      }
    }
    return {
      enterBehavior
    }
  }
  return {
    pendingNodeKeyRef,
    handleKeydown
  }
}
