import {
  Fragment,
  type VNode,
  type VNodeChild,
  defineComponent,
  h,
  inject,
  ref
} from 'vue'
import { happensIn, pxfy } from 'seemly'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import { NEllipsis } from '../../../ellipsis'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import ResizeButton from '../HeaderButton/ResizeButton'
import {
  clampValueFollowCSSRules,
  createNextSorter,
  getColKey,
  isColumnFilterable,
  isColumnResizable,
  isColumnSortable,
  isColumnSorting
} from '../utils'
import {
  type ColumnKey,
  type TableBaseColumn,
  type TableColumnGroup,
  type TableExpandColumn,
  dataTableInjectionKey
} from '../interface'
import SelectionMenu from './SelectionMenu'

function renderTitle(
  column: TableExpandColumn | TableBaseColumn | TableColumnGroup
): VNodeChild {
  return typeof column.title === 'function'
    ? column.title(column as never)
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
      onUnstableColumnResize,
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll
    } = inject(dataTableInjectionKey)!
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
      handleColHeaderClick,
      handleCheckboxUpdateChecked,
      handleColumnResizeStart,
      handleColumnResize
    } = this
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
                      <div
                        class={`${mergedClsPrefix}-data-table-th__title-wrapper`}
                      >
                        <div class={`${mergedClsPrefix}-data-table-th__title`}>
                          {ellipsis === true
                          || (ellipsis && !ellipsis.tooltip) ? (
                                <div
                                  class={`${mergedClsPrefix}-data-table-th__ellipsis`}
                                >
                                  {renderTitle(column)}
                                </div>
                              ) : ellipsis && typeof ellipsis === 'object' ? (
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
                          onResizeStart={() => {
                            handleColumnResizeStart(column as TableBaseColumn)
                          }}
                          onResize={(displacementX) => {
                            handleColumnResize(
                              column as TableBaseColumn,
                              displacementX
                            )
                          }}
                        />
                      ) : null}
                    </>
                  )
                }
                const leftFixed = key in fixedColumnLeftMap
                const rightFixed = key in fixedColumnRightMap
                return (
                  <th
                    ref={el => (cellElsRef[key] = el as HTMLTableCellElement)}
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
                      (leftFixed || rightFixed)
                      && `${mergedClsPrefix}-data-table-th--fixed-${
                        leftFixed ? 'left' : 'right'
                      }`,
                      {
                        [`${mergedClsPrefix}-data-table-th--sorting`]:
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
                  </th>
                )
              })}
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
          ref="body"
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
