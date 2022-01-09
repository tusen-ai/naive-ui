/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  ref,
  defineComponent,
  inject,
  VNode,
  watchEffect,
  onUnmounted,
  PropType,
  CSSProperties,
  computed,
  renderSlot,
  Fragment
} from 'vue'
import { pxfy, repeat } from 'seemly'
import { VirtualList, VirtualListInst, VResizeObserver } from 'vueuc'
import { CNode } from 'css-render'
import { useMemo } from 'vooks'
import { cssrAnchorMetaName } from '../../../_mixins/common'
import { c } from '../../../_utils/cssr'
import { NScrollbar, ScrollbarInst } from '../../../_internal'
import { formatLength } from '../../../_utils'
import { NEmpty } from '../../../empty'
import {
  dataTableInjectionKey,
  RowKey,
  ColumnKey,
  SummaryRowData,
  MainTableBodyRef,
  TmNode
} from '../interface'
import { createRowClassName, getColKey, isColumnSorting } from '../utils'
import Cell from './Cell'
import ExpandTrigger from './ExpandTrigger'
import RenderSafeCheckbox from './BodyCheckbox'
import TableHeader from './Header'
import type { ColItem } from '../use-group-header'

interface NormalRowRenderInfo {
  striped: boolean
  tmNode: TmNode
  key: RowKey
}

type RowRenderInfo =
  | {
    isSummaryRow: true
    key: RowKey
    tmNode: {
      rawNode: SummaryRowData
      disabled: boolean
    }
  }
  | NormalRowRenderInfo
  | {
    isExpandedRow: true
    tmNode: TmNode
    key: RowKey
  }

function flatten (
  rowInfos: NormalRowRenderInfo[],
  expandedRowKeys: Set<RowKey>
): NormalRowRenderInfo[] {
  const fRows: NormalRowRenderInfo[] = []
  function traverse (rs: TmNode[]): void {
    rs.forEach((r) => {
      if (r.children && expandedRowKeys.has(r.key)) {
        fRows.push({
          tmNode: r,
          striped: false,
          key: r.key
        })
        traverse(r.children)
      } else {
        fRows.push({
          key: r.key,
          tmNode: r,
          striped: false
        })
      }
    })
  }
  rowInfos.forEach((rowInfo) => {
    fRows.push(rowInfo)
    const { children } = rowInfo.tmNode
    if (children && expandedRowKeys.has(rowInfo.key)) {
      traverse(children)
    }
  })
  return fRows
}

const VirtualListItemWrapper = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    cols: {
      type: Array as PropType<ColItem[]>,
      required: true
    },
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix, id, cols, onMouseenter, onMouseleave } = this
    return (
      <table
        style={{ tableLayout: 'fixed' }}
        class={`${clsPrefix}-data-table-table`}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
      >
        <colgroup>
          {cols.map((col) => (
            <col key={col.key} style={col.style}></col>
          ))}
        </colgroup>
        <tbody data-n-id={id} class={`${clsPrefix}-data-table-tbody`}>
          {this.$slots}
        </tbody>
      </table>
    )
  }
})

export default defineComponent({
  name: 'DataTableBody',
  props: {
    onResize: Function as PropType<(e: ResizeObserverEntry) => void>,
    showHeader: Boolean,
    flexHeight: Boolean,
    bodyStyle: Object as PropType<CSSProperties>
  },
  setup (props) {
    const {
      slots: dataTableSlots,
      mergedExpandedRowKeysRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      scrollXRef,
      colsRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      rowClassNameRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      renderExpandRef,
      hoverKeyRef,
      summaryRef,
      mergedSortStateRef,
      virtualScrollRef,
      componentId,
      scrollPartRef,
      mergedTableLayoutRef,
      hasChildrenRef,
      firstContentfulColIndexRef,
      indentRef,
      rowPropsRef,
      maxHeightRef,
      stripedRef,
      loadingRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doCheck,
      doUncheck
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListRef = ref<VirtualListInst | null>(null)
    const emptyElRef = ref<HTMLElement | null>(null)
    const emptyRef = useMemo(() => paginatedDataRef.value.length === 0)
    // If header is not inside & empty is displayed, no table part would be
    // shown. So to collect a body width, we need to put a ref on empty element
    const shouldDisplaySomeTablePartRef = useMemo(
      () => props.showHeader || !emptyRef.value
    )
    // If no body is shown, we shouldn't show scrollbar
    const bodyShowHeaderOnlyRef = useMemo(() => {
      return props.showHeader || emptyRef.value
    })
    let lastSelectedKey: string | number = ''
    const mergedExpandedRowKeySetRef = computed(() => {
      return new Set(mergedExpandedRowKeysRef.value)
    })
    function handleCheckboxUpdateChecked (
      tmNode: { key: RowKey },
      checked: boolean,
      shiftKey: boolean
    ): void {
      if (shiftKey) {
        const lastIndex = paginatedDataRef.value.findIndex(
          (item) => item.key === lastSelectedKey
        )
        if (lastIndex !== -1) {
          const currentIndex = paginatedDataRef.value.findIndex(
            (item) => item.key === tmNode.key
          )
          const start = Math.min(lastIndex, currentIndex)
          const end = Math.max(lastIndex, currentIndex)
          const rowKeysToCheck: RowKey[] = []
          paginatedDataRef.value.slice(start, end + 1).forEach((r) => {
            if (!r.disabled) {
              rowKeysToCheck.push(r.key)
            }
          })
          if (checked) {
            doCheck(rowKeysToCheck)
          } else {
            doUncheck(rowKeysToCheck)
          }
          lastSelectedKey = tmNode.key
          return
        }
      }

      if (checked) {
        doCheck(tmNode.key)
      } else {
        doUncheck(tmNode.key)
      }
      lastSelectedKey = tmNode.key
    }
    function getScrollContainer (): HTMLElement | null {
      if (!shouldDisplaySomeTablePartRef.value) {
        const { value: emptyEl } = emptyElRef
        if (emptyEl) {
          return emptyEl
        } else {
          return null
        }
      }
      if (virtualScrollRef.value) {
        return virtualListContainer()
      }
      const { value } = scrollbarInstRef
      if (value) return value.containerRef
      return null
    }
    function handleUpdateExpanded (key: RowKey): void {
      const { value: mergedExpandedRowKeys } = mergedExpandedRowKeysRef
      const index = mergedExpandedRowKeys.indexOf(key)
      const nextExpandedKeys = Array.from(mergedExpandedRowKeys)
      if (~index) {
        nextExpandedKeys.splice(index, 1)
      } else {
        nextExpandedKeys.push(key)
      }
      doUpdateExpandedRowKeys(nextExpandedKeys)
    }
    function handleMouseleaveTable (): void {
      hoverKeyRef.value = null
    }
    function handleMouseenterTable (): void {
      scrollPartRef.value = 'body'
    }
    function virtualListContainer (): HTMLElement {
      const { value } = virtualListRef
      return value?.listElRef as HTMLElement
    }
    function virtualListContent (): HTMLElement {
      const { value } = virtualListRef
      return value?.itemsElRef as HTMLElement
    }
    function handleVirtualListScroll (e: Event): void {
      handleTableBodyScroll(e)
      scrollbarInstRef.value?.sync()
    }
    function handleVirtualListResize (e: ResizeObserverEntry): void {
      const { onResize } = props
      if (onResize) onResize(e)
      scrollbarInstRef.value?.sync()
    }
    const exposedMethods: MainTableBodyRef = {
      getScrollContainer
    }

    interface StyleCProps {
      leftActiveFixedColKey: ColumnKey | null
      leftActiveFixedChildrenColKeys: ColumnKey[]
      rightActiveFixedColKey: ColumnKey | null
      rightActiveFixedChildrenColKeys: ColumnKey[]
      componentId: string
    }

    // manually control shadow style to avoid rerender
    const style = c([
      ({ props: cProps }: { props: StyleCProps }) => {
        const createActiveLeftFixedStyle = (
          leftActiveFixedColKey: ColumnKey | null
        ): CNode | null => {
          if (leftActiveFixedColKey === null) return null
          return c(
            `[data-n-id="${cProps.componentId}"] [data-col-key="${leftActiveFixedColKey}"]::after`,
            { boxShadow: 'var(--n-box-shadow-after)' }
          )
        }

        const createActiveRightFixedStyle = (
          rightActiveFixedColKey: ColumnKey | null
        ): CNode | null => {
          if (rightActiveFixedColKey === null) return null
          return c(
            `[data-n-id="${cProps.componentId}"] [data-col-key="${rightActiveFixedColKey}"]::before`,
            { boxShadow: 'var(--n-box-shadow-before)' }
          )
        }

        return c([
          createActiveLeftFixedStyle(cProps.leftActiveFixedColKey),
          createActiveRightFixedStyle(cProps.rightActiveFixedColKey),
          cProps.leftActiveFixedChildrenColKeys.map((leftActiveFixedColKey) =>
            createActiveLeftFixedStyle(leftActiveFixedColKey)
          ),
          cProps.rightActiveFixedChildrenColKeys.map((rightActiveFixedColKey) =>
            createActiveRightFixedStyle(rightActiveFixedColKey)
          )
        ])
      }
    ])
    let fixedStyleMounted = false
    watchEffect(() => {
      const { value: leftActiveFixedColKey } = leftActiveFixedColKeyRef
      const { value: leftActiveFixedChildrenColKeys } =
        leftActiveFixedChildrenColKeysRef
      const { value: rightActiveFixedColKey } = rightActiveFixedColKeyRef
      const { value: rightActiveFixedChildrenColKeys } =
        rightActiveFixedChildrenColKeysRef
      if (
        !fixedStyleMounted &&
        leftActiveFixedColKey === null &&
        rightActiveFixedColKey === null
      ) {
        return
      }

      const cProps: StyleCProps = {
        leftActiveFixedColKey,
        leftActiveFixedChildrenColKeys,
        rightActiveFixedColKey,
        rightActiveFixedChildrenColKeys,
        componentId
      }
      style.mount({
        id: `n-${componentId}`,
        force: true,
        props: cProps,
        anchorMetaName: cssrAnchorMetaName
      })
      fixedStyleMounted = true
    })
    onUnmounted(() => {
      style.unmount({
        id: `n-${componentId}`
      })
    })
    return {
      dataTableSlots,
      componentId,
      scrollbarInstRef,
      virtualListRef,
      emptyElRef,
      summary: summaryRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollX: scrollXRef,
      cols: colsRef,
      loading: loadingRef,
      bodyShowHeaderOnly: bodyShowHeaderOnlyRef,
      shouldDisplaySomeTablePart: shouldDisplaySomeTablePartRef,
      empty: emptyRef,
      paginatedData: computed(() => {
        const { value: striped } = stripedRef
        return paginatedDataRef.value.map(
          striped
            ? (tmNode, index) => {
                return {
                  tmNode,
                  key: tmNode.key,
                  striped: index % 2 === 1
                }
              }
            : (tmNode) => {
                return {
                  tmNode,
                  key: tmNode.key,
                  striped: false
                }
              }
        )
      }),
      rawPaginatedData: rawPaginatedDataRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeySet: mergedExpandedRowKeySetRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
      mergedTableLayout: mergedTableLayoutRef,
      hasChildren: hasChildrenRef,
      firstContentfulColIndex: firstContentfulColIndexRef,
      indent: indentRef,
      rowProps: rowPropsRef,
      maxHeight: maxHeightRef,
      setHeaderScrollLeft,
      handleMouseenterTable,
      handleVirtualListScroll,
      handleVirtualListResize,
      handleMouseleaveTable,
      virtualListContainer,
      virtualListContent,
      handleTableBodyScroll,
      handleCheckboxUpdateChecked,
      handleUpdateExpanded,
      ...exposedMethods
    }
  },
  render () {
    const {
      mergedTheme,
      scrollX,
      mergedClsPrefix,
      virtualScroll,
      maxHeight,
      mergedTableLayout,
      flexHeight,
      onResize,
      setHeaderScrollLeft
    } = this
    const scrollable =
      scrollX !== undefined || maxHeight !== undefined || flexHeight

    // For a basic table with auto layout whose content may overflow we will
    // make it scrollable, which differs from browser's native behavior.
    // For native behavior, see
    // https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
    const isBasicAutoLayout = !scrollable && mergedTableLayout === 'auto'
    const xScrollable = scrollX !== undefined || isBasicAutoLayout

    const contentStyle: CSSProperties = {
      minWidth: formatLength(scrollX) || '100%'
    }
    if (scrollX) contentStyle.width = '100%'

    const tableNode = (
      <NScrollbar
        ref="scrollbarInstRef"
        scrollable={scrollable || isBasicAutoLayout}
        class={`${mergedClsPrefix}-data-table-base-table-body`}
        style={this.bodyStyle}
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        contentStyle={contentStyle}
        container={virtualScroll ? this.virtualListContainer : undefined}
        content={virtualScroll ? this.virtualListContent : undefined}
        horizontalRailStyle={{ zIndex: 3 }}
        verticalRailStyle={{ zIndex: 3 }}
        xScrollable={xScrollable}
        onScroll={virtualScroll ? undefined : this.handleTableBodyScroll}
        internalOnUpdateScrollLeft={setHeaderScrollLeft}
        onResize={onResize}
      >
        {{
          default: () => {
            // coordinate to pass if there are cells that cross row & col
            const cordToPass: Record<number, number[]> = {}
            // coordinate to related hover keys
            const cordKey: Record<number, Record<number, RowKey[]>> = {}
            const {
              cols,
              paginatedData,
              mergedTheme,
              fixedColumnLeftMap,
              fixedColumnRightMap,
              currentPage,
              rowClassName,
              mergedSortState,
              mergedExpandedRowKeySet,
              componentId,
              hasChildren,
              firstContentfulColIndex,
              rowProps,
              handleMouseenterTable,
              handleMouseleaveTable,
              renderExpand,
              summary,
              handleCheckboxUpdateChecked,
              handleUpdateExpanded
            } = this
            const { length: colCount } = cols

            let mergedData: RowRenderInfo[]

            // if there is children in data, we should expand mergedData first

            const mergedPaginationData = hasChildren
              ? flatten(paginatedData, mergedExpandedRowKeySet)
              : paginatedData

            if (summary) {
              const summaryRows = summary(this.rawPaginatedData)
              if (Array.isArray(summaryRows)) {
                mergedData = [
                  ...mergedPaginationData,
                  ...summaryRows.map((row, i) => ({
                    isSummaryRow: true as const,
                    key: `__n_summary__${i}`,
                    tmNode: {
                      rawNode: row,
                      disabled: true
                    }
                  }))
                ]
              } else {
                mergedData = [
                  ...mergedPaginationData,
                  {
                    isSummaryRow: true,
                    key: '__n_summary__',
                    tmNode: {
                      rawNode: summaryRows,
                      disabled: true
                    }
                  }
                ]
              }
            } else {
              mergedData = mergedPaginationData
            }

            const indentStyle = hasChildren
              ? { width: pxfy(this.indent) }
              : undefined

            // Tile the data of the expanded row
            const displayedData: RowRenderInfo[] = []
            mergedData.forEach((rowInfo) => {
              if (renderExpand && mergedExpandedRowKeySet.has(rowInfo.key)) {
                displayedData.push(rowInfo, {
                  isExpandedRow: true,
                  key: rowInfo.key,
                  tmNode: rowInfo.tmNode as TmNode
                })
              } else {
                displayedData.push(rowInfo)
              }
            })

            const { length: rowCount } = displayedData

            const rowIndexToKey: Record<number, RowKey> = {}
            paginatedData.forEach(({ tmNode }, rowIndex) => {
              rowIndexToKey[rowIndex] = tmNode.key
            })

            const renderRow = (
              rowInfo: RowRenderInfo,
              rowIndex: number,
              isVirtual: boolean
            ): VNode => {
              if ('isExpandedRow' in rowInfo) {
                const {
                  tmNode: { key, rawNode }
                } = rowInfo
                return (
                  <tr
                    class={`${mergedClsPrefix}-data-table-tr`}
                    key={`${key}__expand`}
                  >
                    <td
                      class={[
                        `${mergedClsPrefix}-data-table-td`,
                        `${mergedClsPrefix}-data-table-td--last-col`,
                        rowIndex + 1 === rowCount &&
                          `${mergedClsPrefix}-data-table-td--last-row`
                      ]}
                      colspan={colCount}
                    >
                      {renderExpand!(rawNode, rowIndex)}
                    </td>
                  </tr>
                )
              }
              const isSummary = 'isSummaryRow' in rowInfo
              const striped = !isSummary && rowInfo.striped
              const { tmNode, key: rowKey } = rowInfo
              const { rawNode: rowData } = tmNode
              const expanded = mergedExpandedRowKeySet.has(rowKey)
              const props = rowProps ? rowProps(rowData, rowIndex) : undefined
              const mergedRowClassName =
                typeof rowClassName === 'string'
                  ? rowClassName
                  : createRowClassName(rowData, rowIndex, rowClassName)
              const row = (
                <tr
                  onMouseenter={() => {
                    this.hoverKey = rowKey
                  }}
                  key={rowKey}
                  class={[
                    `${mergedClsPrefix}-data-table-tr`,
                    isSummary && `${mergedClsPrefix}-data-table-tr--summary`,
                    striped && `${mergedClsPrefix}-data-table-tr--striped`,
                    mergedRowClassName
                  ]}
                  {...props}
                >
                  {cols.map((col, colIndex) => {
                    if (!isVirtual && rowIndex in cordToPass) {
                      const cordOfRowToPass = cordToPass[rowIndex]
                      const indexInCordOfRowToPass =
                        cordOfRowToPass.indexOf(colIndex)
                      if (~indexInCordOfRowToPass) {
                        cordOfRowToPass.splice(indexInCordOfRowToPass, 1)
                        return null
                      }
                    }

                    // TODO: Simplify row calculation
                    const { column } = col
                    const colKey = getColKey(col)
                    const { rowSpan, colSpan } = column
                    const mergedColSpan = isSummary
                      ? rowInfo.tmNode.rawNode[colKey]?.colSpan || 1 // optional for #1276
                      : colSpan
                        ? colSpan(rowData, rowIndex)
                        : 1
                    const mergedRowSpan = isSummary
                      ? rowInfo.tmNode.rawNode[colKey]?.rowSpan || 1 // optional for #1276
                      : rowSpan
                        ? rowSpan(rowData, rowIndex)
                        : 1
                    const isLastCol = colIndex + mergedColSpan === colCount
                    const isLastRow = rowIndex + mergedRowSpan === rowCount
                    const isCrossRowTd = mergedRowSpan > 1
                    if (isCrossRowTd) {
                      cordKey[rowIndex] = {
                        [colIndex]: []
                      }
                    }
                    if (mergedColSpan > 1 || isCrossRowTd) {
                      for (
                        let i = rowIndex;
                        i < rowIndex + mergedRowSpan;
                        ++i
                      ) {
                        if (isCrossRowTd) {
                          cordKey[rowIndex][colIndex].push(rowIndexToKey[i])
                        }
                        for (
                          let j = colIndex;
                          j < colIndex + mergedColSpan;
                          ++j
                        ) {
                          if (i === rowIndex && j === colIndex) continue
                          if (!(i in cordToPass)) {
                            cordToPass[i] = [j]
                          } else {
                            cordToPass[i].push(j)
                          }
                        }
                      }
                    }
                    const hoverKey = isCrossRowTd ? this.hoverKey : null
                    const { ellipsis } = column
                    return (
                      <td
                        key={colKey}
                        style={{
                          textAlign: column.align || undefined,
                          left: pxfy(fixedColumnLeftMap[colKey]?.start),
                          right: pxfy(fixedColumnRightMap[colKey]?.start)
                        }}
                        colspan={mergedColSpan}
                        rowspan={isVirtual ? undefined : mergedRowSpan}
                        data-col-key={colKey}
                        class={[
                          `${mergedClsPrefix}-data-table-td`,
                          column.className,
                          isSummary &&
                            `${mergedClsPrefix}-data-table-td--summary`,
                          ((hoverKey !== null &&
                            cordKey[rowIndex][colIndex].includes(hoverKey)) ||
                            isColumnSorting(column, mergedSortState)) &&
                            `${mergedClsPrefix}-data-table-td--hover`,
                          column.fixed &&
                            `${mergedClsPrefix}-data-table-td--fixed-${column.fixed}`,
                          column.align &&
                            `${mergedClsPrefix}-data-table-td--${column.align}-align`,
                          {
                            [`${mergedClsPrefix}-data-table-td--ellipsis`]:
                              ellipsis === true ||
                              // don't add ellipsis class if tooltip exists
                              (ellipsis && !ellipsis.tooltip),
                            [`${mergedClsPrefix}-data-table-td--selection`]:
                              column.type === 'selection',
                            [`${mergedClsPrefix}-data-table-td--expand`]:
                              column.type === 'expand',
                            [`${mergedClsPrefix}-data-table-td--last-col`]:
                              isLastCol,
                            [`${mergedClsPrefix}-data-table-td--last-row`]:
                              isLastRow
                          }
                        ]}
                      >
                        {hasChildren && colIndex === firstContentfulColIndex
                          ? [
                              repeat(
                                isSummary ? 0 : rowInfo.tmNode.level,
                                <div
                                  class={`${mergedClsPrefix}-data-table-indent`}
                                  style={indentStyle}
                                />
                              ),
                              isSummary || !rowInfo.tmNode.children ? (
                                <div
                                  class={`${mergedClsPrefix}-data-table-expand-placeholder`}
                                />
                              ) : (
                                <ExpandTrigger
                                  class={`${mergedClsPrefix}-data-table-expand-trigger`}
                                  clsPrefix={mergedClsPrefix}
                                  expanded={expanded}
                                  onClick={() => {
                                    handleUpdateExpanded(rowKey)
                                  }}
                                />
                              )
                            ]
                          : null}
                        {column.type === 'selection' ? (
                          !isSummary ? (
                            <RenderSafeCheckbox
                              key={currentPage}
                              rowKey={rowKey}
                              disabled={rowInfo.tmNode.disabled}
                              onUpdateChecked={(checked: boolean, e) =>
                                handleCheckboxUpdateChecked(
                                  rowInfo.tmNode,
                                  checked,
                                  e.shiftKey
                                )
                              }
                            />
                          ) : null
                        ) : column.type === 'expand' ? (
                          !isSummary ? (
                            !column.expandable ||
                            column.expandable?.(rowData, rowIndex) ? (
                              <ExpandTrigger
                                clsPrefix={mergedClsPrefix}
                                expanded={expanded}
                                onClick={() => handleUpdateExpanded(rowKey)}
                              />
                                ) : null
                          ) : null
                        ) : (
                          <Cell
                            index={rowIndex}
                            row={rowData}
                            column={column}
                            isSummary={isSummary}
                            mergedTheme={mergedTheme}
                          />
                        )}
                      </td>
                    )
                  })}
                </tr>
              )

              return row
            }

            if (!virtualScroll) {
              return (
                <table
                  class={`${mergedClsPrefix}-data-table-table`}
                  onMouseleave={handleMouseleaveTable}
                  onMouseenter={handleMouseenterTable}
                  style={{
                    tableLayout: this.mergedTableLayout
                  }}
                >
                  <colgroup>
                    {cols.map((col) => (
                      <col key={col.key} style={col.style}></col>
                    ))}
                  </colgroup>
                  {this.showHeader ? <TableHeader discrete={false} /> : null}
                  {!this.empty ? (
                    <tbody
                      data-n-id={componentId}
                      class={`${mergedClsPrefix}-data-table-tbody`}
                    >
                      {displayedData.map((rowInfo, rowIndex) => {
                        return renderRow(rowInfo, rowIndex, false)
                      })}
                    </tbody>
                  ) : null}
                </table>
              )
            } else {
              return (
                <VirtualList
                  ref="virtualListRef"
                  items={displayedData}
                  itemSize={28}
                  visibleItemsTag={VirtualListItemWrapper}
                  visibleItemsProps={{
                    clsPrefix: mergedClsPrefix,
                    id: componentId,
                    cols,
                    onMouseenter: handleMouseenterTable,
                    onMouseleave: handleMouseleaveTable
                  }}
                  showScrollbar={false}
                  onResize={this.handleVirtualListResize}
                  onScroll={this.handleVirtualListScroll}
                  itemsStyle={contentStyle}
                  itemResizable
                >
                  {{
                    default: ({
                      item,
                      index
                    }: {
                      item: RowRenderInfo
                      index: number
                    }) => renderRow(item, index, true)
                  }}
                </VirtualList>
              )
            }
          }
        }}
      </NScrollbar>
    )

    if (this.empty) {
      const createEmptyNode = (): VNode => (
        <div
          class={[
            `${mergedClsPrefix}-data-table-empty`,
            this.loading && `${mergedClsPrefix}-data-table-empty--hide`
          ]}
          style={this.bodyStyle}
          ref="emptyElRef"
        >
          {renderSlot(this.dataTableSlots, 'empty', undefined, () => [
            <NEmpty
              theme={this.mergedTheme.peers.Empty}
              themeOverrides={this.mergedTheme.peerOverrides.Empty}
            />
          ])}
        </div>
      )
      if (this.shouldDisplaySomeTablePart) {
        return (
          <>
            {tableNode}
            {createEmptyNode()}
          </>
        )
      } else {
        return (
          <VResizeObserver onResize={this.onResize}>
            {{ default: createEmptyNode }}
          </VResizeObserver>
        )
      }
    }
    return tableNode
  }
})
