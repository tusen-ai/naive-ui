import {
  h,
  defineComponent,
  inject,
  VNodeChild,
  Fragment,
  VNode,
  ref,
  onBeforeUpdate
} from 'vue'
import { happensIn, pxfy } from 'seemly'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import { NEllipsis } from '../../../ellipsis'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import ResizeButton from '../HeaderButton/ResizeButton'
import {
  isColumnSortable,
  isColumnFilterable,
  createNextSorter,
  getColKey,
  isColumnSorting,
  isColumnResizable
} from '../utils'
import {
  TableExpandColumn,
  TableColumnGroup,
  TableBaseColumn,
  dataTableInjectionKey,
  TableColumn,
  ColumnKey
} from '../interface'
import SelectionMenu from './SelectionMenu'

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
      doUpdateResizableWidth,
      handleTableHeaderScroll,
      deriveNextSorter,
      doUncheckAll,
      doCheckAll
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const thElsRef = ref<Record<ColumnKey, HTMLElement>>({})
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
    function handleColumnResize (column: TableColumn, width: number): void {
      doUpdateResizableWidth(column, width)
    }
    onBeforeUpdate(() => (thElsRef.value = {}))
    return {
      thElsRef,
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
      handleColumnResize
    }
  },
  render () {
    const {
      thElsRef,
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
                      {ellipsis === true || (ellipsis && !ellipsis.tooltip) ? (
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
                          themeOverrides={mergedTheme.peerOverrides.Ellipsis}
                        >
                          {{
                            default: () => renderTitle(column)
                          }}
                        </NEllipsis>
                        ) : (
                          renderTitle(column)
                        )}
                      {isColumnSortable(column) ? (
                        <SortButton column={column as TableBaseColumn} />
                      ) : null}
                      {isColumnFilterable(column) ? (
                        <FilterButton
                          column={column as TableBaseColumn}
                          options={column.filterOptions}
                        />
                      ) : null}
                      {isColumnResizable(column) ? (
                        <ResizeButton
                          getCurrentWidth={() =>
                            thElsRef[key]?.getBoundingClientRect().width ?? 0
                          }
                          onResize={(distance: number) =>
                            handleColumnResize(column, distance)
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
                    ref={(el) => (thElsRef[key] = el as HTMLElement)}
                    key={key}
                    style={{
                      textAlign: column.align,
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
