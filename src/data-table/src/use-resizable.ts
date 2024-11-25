import type { ColumnKey, TableColumn } from './interface'
import { ref } from 'vue'
import { isColumnResizable } from './utils'

export function useResizable() {
  const resizableWidthsRef = ref<Record<ColumnKey, number>>({})
  function getResizableWidth(key: ColumnKey): number | undefined {
    return resizableWidthsRef.value[key]
  }
  function doUpdateResizableWidth(column: TableColumn, width: number): void {
    if (isColumnResizable(column) && 'key' in column) {
      resizableWidthsRef.value[column.key] = width
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
