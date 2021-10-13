import { beforeNextFrameOnce } from 'seemly'
import { computed, ComputedRef, watch, Ref, ref } from 'vue'
import { formatLength } from '../../_utils'
import { DataTableSetupProps } from './DataTable'
import type { ColumnKey, MainTableRef, TableColumn } from './interface'
import { getColWidth, getColKey } from './utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useScroll (
  props: DataTableSetupProps,
  {
    mainTableInstRef,
    mergedCurrentPageRef,
    bodyWidthRef,
    scrollPartRef
  }: {
    scrollPartRef: Ref<'head' | 'body'>
    bodyWidthRef: Ref<null | number>
    mainTableInstRef: Ref<MainTableRef | null>
    mergedCurrentPageRef: ComputedRef<number>
  }
) {
  let scrollLeft = 0
  const leftActiveFixedColKeyRef = ref<ColumnKey | null>(null)
  const rightActiveFixedColKeyRef = ref<ColumnKey | null>(null)
  const styleScrollXRef = computed(() => {
    return formatLength(props.scrollX)
  })
  const leftFixedColumnsRef = computed(() => {
    return props.columns.filter((column) => column.fixed === 'left')
  })
  const rightFixedColumnsRef = computed(() => {
    return props.columns.filter((column) => column.fixed === 'right')
  })
  const fixedColumnLeftMapRef = computed(() => {
    const columns: Record<
    ColumnKey,
    { start: number, end: number } | undefined
    > = {}
    let left = 0
    function traverse (cols: TableColumn[]): void {
      cols.forEach((col) => {
        const positionInfo = { start: left, end: 0 }
        columns[getColKey(col)] = positionInfo
        if ('children' in col) {
          traverse(col.children)
          positionInfo.end = left
        } else {
          left += getColWidth(col) || 0
          positionInfo.end = left
        }
      })
    }
    traverse(leftFixedColumnsRef.value)
    return columns
  })
  const fixedColumnRightMapRef = computed(() => {
    const columns: Record<
    ColumnKey,
    { start: number, end: number } | undefined
    > = {}
    let right = 0
    function traverse (cols: TableColumn[]): void {
      cols.forEach((col) => {
        const positionInfo = { start: right, end: 0 }
        columns[getColKey(col)] = positionInfo
        if ('children' in col) {
          traverse(col.children)
          positionInfo.end = right
        } else {
          right += getColWidth(col) || 0
          positionInfo.end = right
        }
      })
    }
    traverse(rightFixedColumnsRef.value.reverse())
    return columns
  })
  function deriveActiveLeftFixedColumn (): void {
    // target is header element
    const { value: leftFixedColumns } = leftFixedColumnsRef
    let leftWidth = 0
    const { value: fixedColumnLeftMap } = fixedColumnLeftMapRef
    let leftActiveFixedColKey = null
    for (let i = 0; i < leftFixedColumns.length; ++i) {
      const key = getColKey(leftFixedColumns[i])
      if (scrollLeft > (fixedColumnLeftMap[key]?.start || 0) - leftWidth) {
        leftActiveFixedColKey = key
        leftWidth = fixedColumnLeftMap[key]?.end || 0
      } else {
        break
      }
    }
    leftActiveFixedColKeyRef.value = leftActiveFixedColKey
  }
  function deriveActiveRightFixedColumn (): void {
    // target is header element
    const { value: rightFixedColumns } = rightFixedColumnsRef
    const scrollWidth = Number(props.scrollX)
    const { value: tableWidth } = bodyWidthRef
    if (tableWidth === null) return
    let rightWidth = 0
    let rightActiveFixedColKey = null
    const { value: fixedColumnRightMap } = fixedColumnRightMapRef
    for (let i = 0; i < rightFixedColumns.length; ++i) {
      const key = getColKey(rightFixedColumns[i])
      if (
        Math.round(
          scrollLeft +
            (fixedColumnRightMap[key]?.start || 0) +
            tableWidth -
            rightWidth
        ) < scrollWidth
      ) {
        rightActiveFixedColKey = key
        rightWidth = fixedColumnRightMap[key]?.end || 0
      } else {
        break
      }
    }
    rightActiveFixedColKeyRef.value = rightActiveFixedColKey
  }
  function getScrollElements (): {
    header: HTMLElement | null
    body: HTMLElement | null
  } {
    const header = mainTableInstRef.value
      ? mainTableInstRef.value.getHeaderElement()
      : null
    const body = mainTableInstRef.value
      ? mainTableInstRef.value.getBodyElement()
      : null
    return {
      header,
      body
    }
  }
  function scrollMainTableBodyToTop (): void {
    const { body } = getScrollElements()
    if (body) {
      body.scrollTop = 0
    }
  }
  function handleTableHeaderScroll (): void {
    if (scrollPartRef.value === 'head') {
      beforeNextFrameOnce(syncScrollState)
    }
  }
  function handleTableBodyScroll (): void {
    if (scrollPartRef.value === 'body') {
      beforeNextFrameOnce(syncScrollState)
    }
  }
  function syncScrollState (): void {
    // We can't simply use props.scrollX to determine whether the table has
    // need to be sync since user may set column width for each column.
    // Just let it be, the scroll listener won't be triggered for a basic table.
    const { header, body } = getScrollElements()
    if (!body) return
    const { value: tableWidth } = bodyWidthRef
    if (tableWidth === null) return
    const { value: scrollPart } = scrollPartRef
    if (props.maxHeight || props.flexHeight) {
      if (!header) return
      // we need to deal with overscroll
      if (scrollPart === 'head') {
        scrollLeft = header.scrollLeft
        body.scrollLeft = scrollLeft
      } else {
        scrollLeft = body.scrollLeft
        header.scrollLeft = scrollLeft
      }
    } else {
      scrollLeft = body.scrollLeft
    }
    deriveActiveLeftFixedColumn()
    deriveActiveRightFixedColumn()
  }
  function setHeaderScrollLeft (left: number): void {
    const { header } = getScrollElements()
    if (!header) return
    header.scrollLeft = left
    syncScrollState()
  }
  watch(mergedCurrentPageRef, () => {
    scrollMainTableBodyToTop()
  })
  return {
    styleScrollXRef,
    fixedColumnLeftMapRef,
    fixedColumnRightMapRef,
    leftFixedColumnsRef,
    rightFixedColumnsRef,
    leftActiveFixedColKeyRef,
    rightActiveFixedColKeyRef,
    syncScrollState,
    handleTableBodyScroll,
    handleTableHeaderScroll,
    setHeaderScrollLeft
  }
}
