import { beforeNextFrameOnce } from 'seemly'
import { computed, ComputedRef, watch, Ref, ref } from 'vue'
import { formatLength } from '../../_utils'
import type {
  ColumnKey,
  MainTableRef,
  TableColumn,
  DataTableSetupProps
} from './interface'
import { getNumberColWidth, getColKey } from './utils'

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
  const leftActiveFixedChildrenColKeysRef = ref<ColumnKey[]>([])
  const rightActiveFixedColKeyRef = ref<ColumnKey | null>(null)
  const rightActiveFixedChildrenColKeysRef = ref<ColumnKey[]>([])
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
          left += getNumberColWidth(col) || 0
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
      for (let i = cols.length - 1; i >= 0; --i) {
        const col = cols[i]
        const positionInfo = { start: right, end: 0 }
        columns[getColKey(col)] = positionInfo
        if ('children' in col) {
          traverse(col.children)
          positionInfo.end = right
        } else {
          right += getNumberColWidth(col) || 0
          positionInfo.end = right
        }
      }
    }
    traverse(rightFixedColumnsRef.value)
    return columns
  })
  function deriveActiveLeftFixedColumn (): void {
    // target is header element
    const { value: leftFixedColumns } = leftFixedColumnsRef
    let leftWidth = 0
    const { value: fixedColumnLeftMap } = fixedColumnLeftMapRef
    let leftActiveFixedColKey: string | number | null = null
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
  function deriveActiveLeftFixedChildrenColumns (): void {
    leftActiveFixedChildrenColKeysRef.value = []
    let activeLeftFixedColumn = props.columns.find(
      (col) => getColKey(col) === leftActiveFixedColKeyRef.value
    )
    while (activeLeftFixedColumn && 'children' in activeLeftFixedColumn) {
      const length: number = activeLeftFixedColumn.children.length
      if (length === 0) break
      const nextActiveLeftFixedColumn =
        activeLeftFixedColumn.children[length - 1]
      leftActiveFixedChildrenColKeysRef.value.push(
        getColKey(nextActiveLeftFixedColumn)
      )
      activeLeftFixedColumn = nextActiveLeftFixedColumn
    }
  }
  function deriveActiveRightFixedColumn (): void {
    // target is header element
    const { value: rightFixedColumns } = rightFixedColumnsRef
    const scrollWidth = Number(props.scrollX)
    const { value: tableWidth } = bodyWidthRef
    if (tableWidth === null) return
    let rightWidth = 0
    let rightActiveFixedColKey: string | number | null = null
    const { value: fixedColumnRightMap } = fixedColumnRightMapRef
    for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
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
  function deriveActiveRightFixedChildrenColumns (): void {
    rightActiveFixedChildrenColKeysRef.value = []
    let activeRightFixedColumn = props.columns.find(
      (col) => getColKey(col) === rightActiveFixedColKeyRef.value
    )
    while (
      activeRightFixedColumn &&
      'children' in activeRightFixedColumn &&
      activeRightFixedColumn.children.length
    ) {
      const nextActiveRightFixedColumn = activeRightFixedColumn.children[0]
      rightActiveFixedChildrenColKeysRef.value.push(
        getColKey(nextActiveRightFixedColumn)
      )
      activeRightFixedColumn = nextActiveRightFixedColumn
    }
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
  function handleTableBodyScroll (e: Event): void {
    props.onScroll?.(e)
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
    deriveActiveLeftFixedChildrenColumns()
    deriveActiveRightFixedColumn()
    deriveActiveRightFixedChildrenColumns()
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
    leftActiveFixedChildrenColKeysRef,
    rightActiveFixedColKeyRef,
    rightActiveFixedChildrenColKeysRef,
    syncScrollState,
    handleTableBodyScroll,
    handleTableHeaderScroll,
    setHeaderScrollLeft
  }
}
