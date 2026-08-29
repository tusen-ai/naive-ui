import type { ColumnKey, DataTableSetupProps, TableColumn } from './interface'
import { ref } from 'vue'
import { call } from '../../_utils'
import { isColumnResizable } from './utils'

export function useResizable(props: DataTableSetupProps) {
  const resizableWidthsRef = ref<Record<ColumnKey, number>>({})
  function getResizableWidth(key: ColumnKey): number | undefined {
    return resizableWidthsRef.value[key]
  }
  function doUpdateResizableWidth(column: TableColumn, width: number): void {
    const { 'onUpdate:resizedColumn': _onUpdateResizedColumn } = props
    if (isColumnResizable(column) && 'key' in column) {
      resizableWidthsRef.value[column.key] = width
      if (_onUpdateResizedColumn) {
        call(_onUpdateResizedColumn, width, column)
      }
    }
  }
  function clearResizableWidth(): void {
    resizableWidthsRef.value = {}
  }
  return {
    getResizableWidth,
    doUpdateResizableWidth,
    clearResizableWidth
  }
}
