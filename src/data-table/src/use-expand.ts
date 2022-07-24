import { toRef, ref, Ref } from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { TreeMate } from 'treemate'
import type { DataTableSetupProps } from './DataTable'
import type { Expandable, InternalRowData, RowKey } from './interface'
import { call, warn } from '../../_utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useExpand (
  props: DataTableSetupProps,
  treeMateRef: Ref<TreeMate<InternalRowData, InternalRowData, InternalRowData>>
) {
  const renderExpandRef = useMemo(() => {
    for (const col of props.columns) {
      if (col.type === 'expand') {
        if (__DEV__ && !col.renderExpand) {
          warn(
            'data-table',
            'column with type `expand` has no `renderExpand` prop.'
          )
        }
        return col.renderExpand
      }
    }
  })
  // It's not reactive
  let expandable: Expandable<any> | undefined
  for (const col of props.columns) {
    if (col.type === 'expand') {
      expandable = col.expandable
      break
    }
  }
  const uncontrolledExpandedRowKeysRef = ref(
    props.defaultExpandAll
      ? renderExpandRef?.value
        ? (() => {
            const expandedKeys: RowKey[] = []
            treeMateRef.value.treeNodes.forEach((tmNode) => {
              if (expandable?.(tmNode.rawNode)) {
                expandedKeys.push(tmNode.key)
              }
            })
            return expandedKeys
          })()
        : treeMateRef.value.getNonLeafKeys()
      : props.defaultExpandedRowKeys
  )
  const controlledExpandedRowKeysRef = toRef(props, 'expandedRowKeys')
  const mergedExpandedRowKeysRef = useMergedState(
    controlledExpandedRowKeysRef,
    uncontrolledExpandedRowKeysRef
  )
  function doUpdateExpandedRowKeys (expandedKeys: RowKey[]): void {
    const {
      onUpdateExpandedRowKeys,
      'onUpdate:expandedRowKeys': _onUpdateExpandedRowKeys
    } = props
    if (onUpdateExpandedRowKeys) {
      call(onUpdateExpandedRowKeys, expandedKeys)
    }
    if (_onUpdateExpandedRowKeys) {
      call(_onUpdateExpandedRowKeys, expandedKeys)
    }
    uncontrolledExpandedRowKeysRef.value = expandedKeys
  }
  return {
    mergedExpandedRowKeysRef,
    renderExpandRef,
    doUpdateExpandedRowKeys
  }
}
