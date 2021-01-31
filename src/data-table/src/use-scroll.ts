import { beforeNextFrame } from 'seemly'
import { computed, ComputedRef, watch, Ref } from 'vue'
import { formatLength, warn } from '../../_utils'
import { DataTableProps } from './DataTable'
import type { ColumnKey, MainTableRef } from './interface'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useScroll (
  props: DataTableProps,
  data: {
    mainTableInstRef: Ref<MainTableRef | null>
    mergedCurrentPageRef: ComputedRef<number>
  }
) {
  const { mainTableInstRef, mergedCurrentPageRef } = data
  // which part is being scrolling: body left right header
  let scrollingPart: 'body' | 'left' | 'right' | 'header' | null = null
  let scrollReceived = false
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
    const columns: Record<ColumnKey, number | undefined> = {}
    let left = 0
    for (const column of leftFixedColumnsRef.value) {
      columns[column.key] = left
      left += column.width || 0
    }
    return columns
  })
  const fixedColumnRightMapRef = computed(() => {
    const columns: Record<ColumnKey, number | undefined> = {}
    let right = 0
    for (const column of rightFixedColumnsRef.value.reverse()) {
      columns[column.key] = right
      right += column.width || 0
    }
    return columns
  })
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
    if (scrollReceived && scrollingPart === 'header') return
    switch (scrollingPart) {
      case null:
        scrollingPart = 'header'
        scrollReceived = true
        beforeNextFrame(syncScrollState)
        break
      case 'body':
        scrollingPart = null
        scrollReceived = false
        break
    }
  }
  function handleTableBodyScroll (): void {
    if (scrollReceived && scrollingPart === 'body') return
    switch (scrollingPart) {
      case null:
        scrollingPart = 'body'
        scrollReceived = true
        beforeNextFrame(syncScrollState)
        break
      case 'header':
        scrollingPart = null
        scrollReceived = false
        break
    }
  }
  function syncScrollState (): void {
    if (__DEV__ && scrollingPart === null) {
      warn(
        'data-table',
        'Scroll sync has no corresponding part. This could be a bug of naive-ui.'
      )
    }
    const { header, body } = getScrollElements()
    if (!body || !header) return
    if (body.scrollLeft === header.scrollLeft) {
      scrollingPart = null
      scrollReceived = false
      return
    }
    switch (scrollingPart) {
      case 'header':
        body.scrollLeft = header.scrollLeft
        break
      case 'body':
        header.scrollLeft = body.scrollLeft
        break
    }
  }
  watch(mergedCurrentPageRef, () => {
    scrollMainTableBodyToTop()
  })
  return {
    styleScrollXRef,
    fixedColumnLeftMap: fixedColumnLeftMapRef,
    fixedColumnRightMap: fixedColumnRightMapRef,
    leftFixedColumns: leftFixedColumnsRef,
    rightFixedColumns: rightFixedColumnsRef,
    handleTableBodyScroll,
    handleTableHeaderScroll
  }
}
