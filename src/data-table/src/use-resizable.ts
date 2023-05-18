import { ref } from 'vue'
import type {
  ColumnKey,
  DataTableSetupProps,
  TableBaseColumn,
  TableColumn
} from './interface'
import { isColumnResizable } from './utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useResizable (props: DataTableSetupProps) {
  const resizableWidthsRef = ref<Record<ColumnKey, number>>({})
  function getResizableWidth (key: ColumnKey): number | undefined {
    return resizableWidthsRef.value[key]
  }
  function doUpdateResizableWidth (column: TableColumn, width: number): void {
    if (isColumnResizable(column) && 'key' in column) {
      resizableWidthsRef.value[column.key] = width
    }
  }
  function doUpdateResizableWidthEnd (column: TableBaseColumn): void {
    const { onColumnResizeEnd } = props
    const width = getResizableWidth(column.key)
    onColumnResizeEnd?.({ key: column.key, width })
  }
  function clearResizableWidth (): void {
    resizableWidthsRef.value = {}
  }
  return {
    getResizableWidth,
    doUpdateResizableWidth,
    doUpdateResizableWidthEnd,
    clearResizableWidth
  }
}
