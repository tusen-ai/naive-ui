import type { PropType, VNode, VNodeChild } from 'vue'
import type { VirtualListInst } from 'vueuc'
import type { ColItem, RowItem } from '../use-group-header'
import { happensIn, pxfy } from 'seemly'
import { defineComponent, Fragment, h, inject, ref } from 'vue'
import { VVirtualList } from 'vueuc'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import { NEllipsis } from '../../../ellipsis'
import FilterButton from '../HeaderButton/FilterButton'
import ResizeButton from '../HeaderButton/ResizeButton'
import SortButton from '../HeaderButton/SortButton'
import {
  type ColumnKey,
  dataTableInjectionKey,
  type TableBaseColumn,
  type TableColumnGroup,
  type TableExpandColumn
} from '../interface'
import {
  clampValueFollowCSSRules,
  createNextSorter,
  getColKey,
  isColumnFilterable,
  isColumnResizable,
  isColumnSortable,
  isColumnSorting
} from '../utils'
import SelectionMenu from './SelectionMenu'

function renderTitle(
  column: TableExpandColumn | TableBaseColumn | TableColumnGroup
): VNodeChild {
  return typeof column.title === 'function'
    ? column.title(column as never)
    : column.title
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
    width: String
  },
  render() {
    const { clsPrefix, id, cols, width } = this
    return (
      <table
        style={{ tableLayout: 'fixed', width }}
        class={`${clsPrefix}-data-table-table`}
      >
        <colgroup>
          {cols.map(col => (
            <col key={col.key} style={col.style}></col>
          ))}
        </colgroup>
        <thead data-n-id={id} class={`${clsPrefix}-data-table-thead`}>
          {this.$slots}
        </thead>
      </table>
    )
  }
})

export default defineComponent({
  name: 'DataTableHeader',
  props: {
    discrete: {
      type: Boolean,
      default: true
    }
  },
  setup() {
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
      mergedTableLayoutRef,
      headerCheckboxDisabledRef,
      virtualScrollHeaderRef,
      headerHeightRef,
      onUnstableColumnResize,
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll
    } = inject(dataTableInjectionKey)!
    const virtualListRef = ref<VirtualListInst | null>()
    const cellElsRef = ref<Record<ColumnKey, HTMLTableCellElement>>({})
    function getCellActualWidth(key: ColumnKey): number | undefined {
      const element = cellElsRef.value[key]
      return element?.getBoundingClientRect().width
    }
    function handleCheckboxUpdateChecked(): void {
      if (allRowsCheckedRef.value) {
        doUncheckAll()
      }
      else {
        doCheckAll()
      }
    }
    function handleColHeaderClick(
      e: MouseEvent,
      column: TableBaseColumn
    ): void {
      if (
        happensIn(e, 'dataTableFilter')
        || happensIn(e, 'dataTableResizable')
      ) {
        return
      }
      if (!isColumnSortable(column))
        return
      const activeSorter
        = mergedSortStateRef.value.find(
          state => state.columnKey === column.key
        ) || null
      const nextSorter = createNextSorter(column, activeSorter)
      deriveNextSorter(nextSorter)
    }
    const resizeStartWidthMap = new Map<ColumnKey, number | undefined>()
    function handleColumnResizeStart(column: TableBaseColumn): void {
      resizeStartWidthMap.set(column.key, getCellActualWidth(column.key))
    }
    function handleColumnResize(
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
      headerHeight: headerHeightRef,
      virtualScrollHeader: virtualScrollHeaderRef,
      virtualListRef,
      handleCheckboxUpdateChecked,
      handleColHeaderClick,
      handleTableHeaderScroll,
      handleColumnResizeStart,
      handleColumnResize
    }
  },
  render() {
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
      virtualScrollHeader,
      handleColHeaderClick,
      handleCheckboxUpdateChecked,
      handleColumnResizeStart,
      handleColumnResize
    } = this
    let hasEllipsis = false

    const renderRow = (
      row: RowItem[],
      getLeft: ((index: number) => number) | null,
      headerHeightPx: string | undefined
    ) =>
      row.map(({ column, colIndex, colSpan, rowSpan, isLast }) => {
        const key = getColKey(column)
        const { ellipsis } = column
        if (!hasEllipsis && ellipsis)
          hasEllipsis = true
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
              <div class={`${mergedClsPrefix}-data-table-th__title-wrapper`}>
                <div class={`${mergedClsPrefix}-data-table-th__title`}>
                  {ellipsis === true || (ellipsis && !ellipsis.tooltip) ? (
                    <div class={`${mergedClsPrefix}-data-table-th__ellipsis`}>
                      {renderTitle(column)}
                    </div>
                  ) : ellipsis && typeof ellipsis === 'object' ? (
                    <NEllipsis
                      {...ellipsis}
                      theme={mergedTheme.peers.Ellipsis}
                      themeOverrides={mergedTheme.peerOverrides.Ellipsis}
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
                  onResizeStart={() => {
                    handleColumnResizeStart(column as TableBaseColumn)
                  }}
                  onResize={(displacementX) => {
                    handleColumnResize(column as TableBaseColumn, displacementX)
                  }}
                />
              ) : null}
            </>
          )
        }
        const leftFixed = key in fixedColumnLeftMap
        const rightFixed = key in fixedColumnRightMap
        const CellComponent = (getLeft && !column.fixed ? 'div' : 'th') as 'th'
        return (
          <CellComponent
            ref={el => (cellElsRef[key] = el as HTMLTableCellElement)}
            key={key}
            style={[
              getLeft && !column.fixed
                ? {
                    position: 'absolute',
                    left: pxfy(getLeft(colIndex)),
                    top: 0,
                    bottom: 0
                  }
                : {
                    left: pxfy(fixedColumnLeftMap[key]?.start),
                    right: pxfy(fixedColumnRightMap[key]?.start)
                  },
              {
                width: pxfy(column.width),
                textAlign: column.titleAlign || column.align,
                height: headerHeightPx
              }
            ]}
            colspan={colSpan}
            rowspan={rowSpan}
            data-col-key={key}
            class={[
              `${mergedClsPrefix}-data-table-th`,
              (leftFixed || rightFixed)
              && `${mergedClsPrefix}-data-table-th--fixed-${
                leftFixed ? 'left' : 'right'
              }`,
              {
                [`${mergedClsPrefix}-data-table-th--sorting`]: isColumnSorting(
                  column,
                  mergedSortState
                ),
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
              column.type !== 'selection'
              && column.type !== 'expand'
              && !('children' in column)
                ? (e) => {
                    handleColHeaderClick(e, column)
                  }
                : undefined
            }
          >
            {createColumnVNode()}
          </CellComponent>
        )
      })

    if (virtualScrollHeader) {
      const { headerHeight } = this

      let leftFixedColsCount = 0
      let rightFixedColsCount = 0

      cols.forEach((col) => {
        if (col.column.fixed === 'left') {
          leftFixedColsCount++
        }
        else if (col.column.fixed === 'right') {
          rightFixedColsCount++
        }
      })

      return (
        <VVirtualList
          ref="virtualListRef"
          class={`${mergedClsPrefix}-data-table-base-table-header`}
          style={{ height: pxfy(headerHeight) }}
          onScroll={this.handleTableHeaderScroll}
          columns={cols}
          itemSize={headerHeight}
          showScrollbar={false}
          items={[{}]}
          itemResizable={false}
          visibleItemsTag={VirtualListItemWrapper}
          visibleItemsProps={{
            clsPrefix: mergedClsPrefix,
            id: componentId,
            cols,
            width: formatLength(this.scrollX)
          }}
          renderItemWithCols={({ startColIndex, endColIndex, getLeft }) => {
            const row = cols
              .map<RowItem>((col, index) => {
                return {
                  column: col.column,
                  isLast: index === cols.length - 1,
                  colIndex: col.index,
                  colSpan: 1,
                  rowSpan: 1
                }
              })
              .filter(({ column }, index) => {
                if (startColIndex <= index && index <= endColIndex) {
                  return true
                }
                if (column.fixed) {
                  return true
                }
                return false
              })

            const cells = renderRow(row, getLeft, pxfy(headerHeight))

            cells.splice(
              leftFixedColsCount,
              0,
              <th
                colspan={cols.length - leftFixedColsCount - rightFixedColsCount}
                style={{
                  pointerEvents: 'none',
                  visibility: 'hidden',
                  height: 0
                }}
              />
            )
            return <tr style={{ position: 'relative' }}>{cells}</tr>
          }}
        >
          {{
            default: ({
              renderedItemWithCols
            }: {
              renderedItemWithCols: VNodeChild
            }) => renderedItemWithCols
          }}
        </VVirtualList>
      )
    }

    const theadVNode = (
      <thead
        class={`${mergedClsPrefix}-data-table-thead`}
        data-n-id={componentId}
      >
        {rows.map((row) => {
          return (
            <tr class={`${mergedClsPrefix}-data-table-tr`}>
              {renderRow(row, null, undefined)}
            </tr>
          )
        })}
      </thead>
    )
    if (!discrete) {
      return theadVNode
    }
    const { handleTableHeaderScroll, scrollX } = this
    return (
      <div
        class={`${mergedClsPrefix}-data-table-base-table-header`}
        onScroll={handleTableHeaderScroll}
      >
        <table
          class={`${mergedClsPrefix}-data-table-table`}
          style={{
            minWidth: formatLength(scrollX),
            tableLayout: mergedTableLayout
          }}
        >
          <colgroup>
            {cols.map(col => (
              <col key={col.key} style={col.style} />
            ))}
          </colgroup>
          {theadVNode}
        </table>
      </div>
    )
  }
})
