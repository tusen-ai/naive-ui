import { inject, ref, Ref } from 'vue'
import { TreeNode } from 'treemate'
import { Key, TmNode, TreeOption } from './interface'
import { treeSelectInjectionKey } from '../../tree-select/src/interface'

export function useKeyboard ({
  fNodesRef,
  mergedExpandedKeysRef,
  mergedSelectedKeysRef,
  handleSelect,
  handleSwitcherClick
}: {
  fNodesRef: Ref<Array<TreeNode<TreeOption>>>
  mergedExpandedKeysRef: Ref<Key[]>
  mergedSelectedKeysRef: Ref<Key[]>
  handleSelect: (node: TmNode) => void
  handleSwitcherClick: (node: TmNode) => void
}): {
    pendingNodeKeyRef: Ref<null | Key>
    handleKeyup: (e: KeyboardEvent) => void
    handleKeydown: (e: KeyboardEvent) => void
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
  function handleKeyup (e: KeyboardEvent): void {
    const { value: pendingNodeKey } = pendingNodeKeyRef
    if (pendingNodeKey === null) {
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
      if (!~fIndex) return
      if (e.key === 'Enter') {
        handleSelect(fNodes[fIndex])
      } else if (e.key === 'ArrowDown') {
        fIndex += 1
        while (fIndex < fNodes.length) {
          if (!fNodes[fIndex].disabled) {
            pendingNodeKeyRef.value = fNodes[fIndex].key
            break
          }
          fIndex += 1
        }
      } else if (e.key === 'ArrowUp') {
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
        if (pendingNode.isLeaf) return
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
  }
  function handleKeydown (e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        e.preventDefault()
    }
  }
  return {
    pendingNodeKeyRef,
    handleKeyup,
    handleKeydown
  }
}
