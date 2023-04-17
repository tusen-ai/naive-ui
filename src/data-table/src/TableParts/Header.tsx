import {
  h,
  defineComponent,
  inject,
  VNodeChild,
  Fragment,
  VNode,
  ref
} from 'vue'
import { happensIn, pxfy } from 'seemly'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import { NEllipsis } from '../../../ellipsis'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import ResizeButton from '../HeaderButton/ResizeButton'
import Cell from './Cell'
import {
  isColumnSortable,
  isColumnFilterable,
  createNextSorter,
  getColKey,
  isColumnSorting,
  isColumnResizable,
  clampValueFollowCSSRules
} from '../utils'
import {
  TableExpandColumn,
  TableColumnGroup,
  TableBaseColumn,
  dataTableInjectionKey,
  ColumnKey,
  RowKey,
  SummaryRowData,
  TmNode
} from '../interface'
import SelectionMenu from './SelectionMenu'

interface NormalRowRenderInfo {
  striped: boolean
  tmNode: TmNode
  key: RowKey
  index: number
}

type RowRenderInfo =
  | {
    isSummaryRow: true
    key: RowKey
    tmNode: {
      rawNode: SummaryRowData
      disabled: boolean
    }
    index: number
  }
  | NormalRowRenderInfo
  | {
    isExpandedRow: true
    tmNode: TmNode
    key: RowKey
    index: number
  }

function renderTitle (
  column: TableExpandColumn | TableBaseColumn | TableColumnGroup
): VNodeChild {
  return typeof column.title === 'function'
    ? column.title(column as any)
    : column.title
}

export default defineComponent({
  name: 'DataTableHeader',
  props: {
    discrete: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const {
      mergedClsPrefixRef,
      scrollXRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      allRowsCheckedRef,
      someRowsCheckedRef,
      rowsRef,
      colsRef,
      mergedThemeRef,
      checkOptionsRef,
      mergedSortStateRef,
      componentId,
      scrollPartRef,
      mergedTableLayoutRef,
      headerCheckboxDisabledRef,
      onUnstableColumnResize,
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll,
      rawPaginatedDataRef,
      summaryHeaderRef,
      renderCell
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const cellElsRef = ref<Record<ColumnKey, HTMLTableCellElement>>({})
    function getCellActualWidth (key: ColumnKey): number | undefined {
      const element = cellElsRef.value[key]
      return element?.getBoundingClientRect().width
    }
    function handleCheckboxUpdateChecked (): void {
      if (allRowsCheckedRef.value) {
        doUncheckAll()
      } else {
        doCheckAll()
      }
    }
    function handleColHeaderClick (
      e: MouseEvent,
      column: TableBaseColumn
    ): void {
      if (
        happensIn(e, 'dataTableFilter') ||
        happensIn(e, 'dataTableResizable')
      ) {
        return
      }
      if (!isColumnSortable(column)) return
      const activeSorter =
        mergedSortStateRef.value.find(
          (state) => state.columnKey === column.key
        ) || null
      const nextSorter = createNextSorter(column, activeSorter)
      deriveNextSorter(nextSorter)
    }
    function handleMouseenter (): void {
      scrollPartRef.value = 'head'
    }
    function handleMouseleave (): void {
      scrollPartRef.value = 'body'
    }
    const resizeStartWidthMap: Map<ColumnKey, number | undefined> = new Map()
    function handleColumnResizeStart (column: TableBaseColumn): void {
      resizeStartWidthMap.set(column.key, getCellActualWidth(column.key))
    }
    function handleColumnResize (
      column: TableBaseColumn,
      displacementX: number
    ): void {
      const startWidth = resizeStartWidthMap.get(column.key)
      if (startWidth === undefined) {
        return
      }
      const widthAfterResize = startWidth + displacementX
      const limitWidth = clampValueFollowCSSRules(
        widthAfterResize,
        column.minWidth,
        column.maxWidth
      )
      onUnstableColumnResize(
        widthAfterResize,
        limitWidth,
        column,
        getCellActualWidth
      )
      doUpdateResizableWidth(column, limitWidth)
    }
    return {
      cellElsRef,
      componentId,
      mergedSortState: mergedSortStateRef,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollX: scrollXRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      allRowsChecked: allRowsCheckedRef,
      someRowsChecked: someRowsCheckedRef,
      rows: rowsRef,
      cols: colsRef,
      mergedTheme: mergedThemeRef,
      checkOptions: checkOptionsRef,
      mergedTableLayout: mergedTableLayoutRef,
      headerCheckboxDisabled: headerCheckboxDisabledRef,
      handleMouseenter,
      handleMouseleave,
      handleCheckboxUpdateChecked,
      handleColHeaderClick,
      handleTableHeaderScroll,
      handleColumnResizeStart,
      handleColumnResize,
      rawPaginatedData: rawPaginatedDataRef,
      summaryHeader: summaryHeaderRef,
      renderCell
    }
  },
  render () {
    const {
      cellElsRef,
      mergedClsPrefix,
      fixedColumnLeftMap,
      fixedColumnRightMap,
      currentPage,
      allRowsChecked,
      someRowsChecked,
      rows,
      cols,
      mergedTheme,
      checkOptions,
      componentId,
      discrete,
      mergedTableLayout,
      headerCheckboxDisabled,
      mergedSortState,
      handleColHeaderClick,
      handleCheckboxUpdateChecked,
      handleColumnResizeStart,
      handleColumnResize,
      summaryHeader
    } = this
    let summaryData: RowRenderInfo[] = []
    if (summaryHeader) {
      const summaryRows = summaryHeader(this.rawPaginatedData)
      if (Array.isArray(summaryRows)) {
        const summaryRowData = summaryRows.map((row, i) => ({
          isSummaryRow: true as const,
          key: `__n_summary__${i}`,
          tmNode: {
            rawNode: row,
            disabled: true
          },
          index: -1
        }))
        summaryData = summaryRowData
      } else {
        const summaryRowData = {
          isSummaryRow: true as const,
          key: '__n_summary__',
          tmNode: {
            rawNode: summaryRows,
            disabled: true
          },
          index: -1
        }
        summaryData = [summaryRowData]
      }
    }
    const { length: colCount } = cols
    const cordToPass: Record<number, number[]> = {}
    const cordKey: Record<number, Record<number, RowKey[]>> = {}
    const renderSummaryHeaderRow = (
      rowInfo: RowRenderInfo,
      displayedRowIndex: number
    ): VNode => {
      const { index: actualRowIndex } = rowInfo
      const isSummary = 'isSummaryRow' in rowInfo
      const { tmNode, key: rowKey } = rowInfo
      const { rawNode: rowData } = tmNode
      const row = (
        <tr
          key={rowKey}
          class={[
            `${mergedClsPrefix}-data-table-tr`,
            isSummary && `${mergedClsPrefix}-data-table-tr--summary`
          ]}
        >
          {cols.map((col, colIndex) => {
            if (displayedRowIndex in cordToPass) {
              const cordOfRowToPass = cordToPass[displayedRowIndex]
              const indexInCordOfRowToPass = cordOfRowToPass.indexOf(colIndex)
              if (~indexInCordOfRowToPass) {
                cordOfRowToPass.splice(indexInCordOfRowToPass, 1)
                return null
              }
            }
            const { column } = col
            const colKey = getColKey(col)
            const { rowSpan, colSpan } = column
            const mergedColSpan = isSummary
              ? rowInfo.tmNode.rawNode[colKey]?.colSpan || 1
              : colSpan
                ? colSpan(rowData, actualRowIndex)
                : 1
            const mergedRowSpan = isSummary
              ? rowInfo.tmNode.rawNode[colKey]?.rowSpan || 1
              : rowSpan
                ? rowSpan(rowData, actualRowIndex)
                : 1
            const isLastCol = colIndex + mergedColSpan === colCount
            const isCrossRowTd = mergedRowSpan > 1
            if (isCrossRowTd) {
              cordKey[displayedRowIndex] = {
                [colIndex]: []
              }
            }
            if (mergedColSpan > 1 || isCrossRowTd) {
              for (
                let i = displayedRowIndex;
                i < displayedRowIndex + mergedRowSpan;
                ++i
              ) {
                if (isCrossRowTd) {
                  cordKey[displayedRowIndex][colIndex].push(i)
                }
                for (let j = colIndex; j < colIndex + mergedColSpan; ++j) {
                  if (i === displayedRowIndex && j === colIndex) {
                    continue
                  }
                  if (!(i in cordToPass)) {
                    cordToPass[i] = [j]
                  } else {
                    cordToPass[i].push(j)
                  }
                }
              }
            }
            const { cellProps } = column
            const resolvedCellProps = cellProps?.(rowData, actualRowIndex)
            return (
              <td
                {...resolvedCellProps}
                key={colKey}
                style={[
                  {
                    textAlign: column.align || undefined,
                    left: pxfy(fixedColumnLeftMap[colKey]?.start),
                    right: pxfy(fixedColumnRightMap[colKey]?.start)
                  },
                  resolvedCellProps?.style || ''
                ]}
                colspan={mergedColSpan}
                rowspan={mergedRowSpan}
                data-col-key={colKey}
                class={[
                  `${mergedClsPrefix}-data-table-th`,
                  column.className,
                  resolvedCellProps?.class,
                  isSummary && `${mergedClsPrefix}-data-table-td--summary`,
                  column.fixed &&
                    `${mergedClsPrefix}-data-table-th--fixed-${column.fixed}`,
                  column.align &&
                    `${mergedClsPrefix}-data-table-td--${column.align}-align`,
                  column.type === 'selection' &&
                    `${mergedClsPrefix}-data-table-th--selection`,
                  isLastCol && `${mergedClsPrefix}-data-table-th--last`
                ]}
              >
                {column.type === 'selection' || column.type === 'expand' ? (
                  !isSummary ? (
                    <span />
                  ) : null
                ) : (
                  <Cell
                    clsPrefix={mergedClsPrefix}
                    index={actualRowIndex}
                    row={rowData}
                    column={column}
                    isSummary={isSummary}
                    mergedTheme={mergedTheme}
                    renderCell={this.renderCell}
                  />
                )}
              </td>
            )
          })}
        </tr>
      )
      return row
    }
    let hasEllipsis = false
    const theadVNode = (
      <thead
        class={`${mergedClsPrefix}-data-table-thead`}
        data-n-id={componentId}
      >
        {rows.map((row) => {
          return (
            <tr class={`${mergedClsPrefix}-data-table-tr`}>
              {row.map(({ column, colSpan, rowSpan, isLast }) => {
                const key = getColKey(column)
                const { ellipsis } = column
                if (!hasEllipsis && ellipsis) hasEllipsis = true
                const createColumnVNode = (): VNode | null => {
                  if (column.type === 'selection') {
                    return column.multiple !== false ? (
                      <>
                        <NCheckbox
                          key={currentPage}
                          privateInsideTable
                          checked={allRowsChecked}
                          indeterminate={someRowsChecked}
                          disabled={headerCheckboxDisabled}
                          onUpdateChecked={handleCheckboxUpdateChecked}
                        />
                        {checkOptions ? (
                          <SelectionMenu clsPrefix={mergedClsPrefix} />
                        ) : null}
                      </>
                    ) : null
                  }
                  return (
                    <>
                      <div
                        class={`${mergedClsPrefix}-data-table-th__title-wrapper`}
                      >
                        <div class={`${mergedClsPrefix}-data-table-th__title`}>
                          {ellipsis === true ||
                          (ellipsis && !ellipsis.tooltip) ? (
                            <div
                              class={`${mergedClsPrefix}-data-table-th__ellipsis`}
                            >
                              {renderTitle(column)}
                            </div>
                              ) // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                            : ellipsis && typeof ellipsis === 'object' ? (
                            <NEllipsis
                              {...ellipsis}
                              theme={mergedTheme.peers.Ellipsis}
                              themeOverrides={
                                mergedTheme.peerOverrides.Ellipsis
                              }
                            >
                              {{
                                default: () => renderTitle(column)
                              }}
                            </NEllipsis>
                            ) : (
                              renderTitle(column)
                            )}
                        </div>
                        {isColumnSortable(column) ? (
                          <SortButton column={column as TableBaseColumn} />
                        ) : null}
                      </div>
                      {isColumnFilterable(column) ? (
                        <FilterButton
                          column={column as TableBaseColumn}
                          options={column.filterOptions}
                        />
                      ) : null}
                      {isColumnResizable(column) ? (
                        <ResizeButton
                          onResizeStart={() =>
                            handleColumnResizeStart(column as TableBaseColumn)
                          }
                          onResize={(displacementX) =>
                            handleColumnResize(
                              column as TableBaseColumn,
                              displacementX
                            )
                          }
                        />
                      ) : null}
                    </>
                  )
                }
                const leftFixed = key in fixedColumnLeftMap
                const rightFixed = key in fixedColumnRightMap
                return (
                  <th
                    ref={(el) => (cellElsRef[key] = el as HTMLTableCellElement)}
                    key={key}
                    style={{
                      textAlign: column.titleAlign || column.align,
                      left: pxfy(fixedColumnLeftMap[key]?.start),
                      right: pxfy(fixedColumnRightMap[key]?.start)
                    }}
                    colspan={colSpan}
                    rowspan={rowSpan}
                    data-col-key={key}
                    class={[
                      `${mergedClsPrefix}-data-table-th`,
                      (leftFixed || rightFixed) &&
                        `${mergedClsPrefix}-data-table-th--fixed-${
                          leftFixed ? 'left' : 'right'
                        }`,
                      {
                        [`${mergedClsPrefix}-data-table-th--hover`]:
                          isColumnSorting(column, mergedSortState),
                        [`${mergedClsPrefix}-data-table-th--filterable`]:
                          isColumnFilterable(column),
                        [`${mergedClsPrefix}-data-table-th--sortable`]:
                          isColumnSortable(column),
                        [`${mergedClsPrefix}-data-table-th--selection`]:
                          column.type === 'selection',
                        [`${mergedClsPrefix}-data-table-th--last`]: isLast
                      },
                      column.className
                    ]}
                    onClick={
                      column.type !== 'selection' &&
                      column.type !== 'expand' &&
                      !('children' in column)
                        ? (e) => {
                            handleColHeaderClick(e, column)
                          }
                        : undefined
                    }
                  >
                    {createColumnVNode()}
                  </th>
                )
              })}
            </tr>
          )
        })}
        {!!summaryData &&
          summaryData.map((rowInfo, displayedRowIndex) => {
            return renderSummaryHeaderRow(rowInfo, displayedRowIndex)
          })}
      </thead>
    )
    if (!discrete) {
      return theadVNode
    }
    const {
      handleTableHeaderScroll,
      handleMouseenter,
      handleMouseleave,
      scrollX
    } = this
    return (
      <div
        class={`${mergedClsPrefix}-data-table-base-table-header`}
        onScroll={handleTableHeaderScroll}
        onMouseenter={handleMouseenter}
        onMouseleave={handleMouseleave}
      >
        <table
          ref="body"
          class={`${mergedClsPrefix}-data-table-table`}
          style={{
            minWidth: formatLength(scrollX),
            tableLayout: mergedTableLayout
          }}
        >
          <colgroup>
            {cols.map((col) => (
              <col key={col.key} style={col.style} />
            ))}
          </colgroup>
          {theadVNode}
        </table>
      </div>
    )
  }
})
