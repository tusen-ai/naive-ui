import { h, defineComponent, inject, PropType, VNodeChild, Fragment } from 'vue'
import { happensIn, pxfy } from 'seemly'
import { formatLength } from '../../../_utils'
import { NCheckbox } from '../../../checkbox'
import { NEllipsis } from '../../../ellipsis'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import {
  isColumnSortable,
  isColumnFilterable,
  createNextSorter,
  getColKey
} from '../utils'
import {
  TableExpandColumn,
  TableColumnGroup,
  TableBaseColumn,
  dataTableInjectionKey
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
    onScroll: Function as PropType<(e: Event) => void>
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
      doUpdateSorter,
      doUncheckAll,
      doCheckAll
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    function handleCheckboxUpdateChecked (): void {
      if (someRowsCheckedRef.value || allRowsCheckedRef.value) {
        doUncheckAll()
      } else {
        doCheckAll()
      }
    }
    function handleColHeaderClick (
      e: MouseEvent,
      column: TableBaseColumn
    ): void {
      if (happensIn(e, 'dataTableFilter')) return
      if (!isColumnSortable(column)) return
      const activeSorter = mergedSortStateRef.value
      const nextSorter = createNextSorter(column, activeSorter)
      doUpdateSorter(nextSorter)
    }
    function handleMouseenter (): void {
      scrollPartRef.value = 'head'
    }
    return {
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
      handleMouseenter,
      handleCheckboxUpdateChecked,
      handleColHeaderClick
    }
  },
  render () {
    const {
      mergedClsPrefix,
      scrollX,
      fixedColumnLeftMap,
      fixedColumnRightMap,
      currentPage,
      allRowsChecked,
      someRowsChecked,
      mergedSortState,
      rows,
      cols,
      mergedTheme,
      checkOptions,
      componentId,
      onScroll,
      handleMouseenter,
      handleColHeaderClick,
      handleCheckboxUpdateChecked
    } = this
    return (
      <div
        class={`${mergedClsPrefix}-data-table-base-table-header`}
        onScroll={onScroll}
        onMouseenter={handleMouseenter}
      >
        <table
          ref="body"
          class={`${mergedClsPrefix}-data-table-table`}
          style={{ minWidth: formatLength(scrollX) }}
        >
          <colgroup>
            {cols.map((col) => (
              <col key={col.key} style={col.style} />
            ))}
          </colgroup>
          <thead
            class={`${mergedClsPrefix}-data-table-thead`}
            data-n-id={componentId}
          >
            {rows.map((row) => {
              return (
                <tr class={`${mergedClsPrefix}-data-table-tr`}>
                  {row.map(({ column, colSpan, rowSpan, isLast }) => {
                    const key = getColKey(column)
                    return (
                      <th
                        key={key}
                        style={{
                          textAlign: column.align,
                          left: pxfy(fixedColumnLeftMap[key]),
                          right: pxfy(fixedColumnRightMap[key])
                        }}
                        colspan={colSpan}
                        rowspan={rowSpan}
                        data-col-key={key}
                        class={[
                          `${mergedClsPrefix}-data-table-th`,
                          column.fixed &&
                            `${mergedClsPrefix}-data-table-th--fixed-${column.fixed}`,
                          {
                            [`${mergedClsPrefix}-data-table-th--hover`]:
                              mergedSortState?.order &&
                              mergedSortState.columnKey === key,
                            [`${mergedClsPrefix}-data-table-th--filterable`]: isColumnFilterable(
                              column
                            ),
                            [`${mergedClsPrefix}-data-table-th--sortable`]: isColumnSortable(
                              column
                            ),
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
                        {column.type === 'selection' ? (
                          <>
                            <NCheckbox
                              key={currentPage}
                              tableHeader
                              checked={allRowsChecked}
                              indeterminate={someRowsChecked}
                              onUpdateChecked={handleCheckboxUpdateChecked}
                            />
                            {checkOptions ? (
                              <SelectionMenu clsPrefix={mergedClsPrefix} />
                            ) : null}
                          </>
                        ) : column.ellipsis === true ||
                          (column.ellipsis && !column.ellipsis.tooltip) ? (
                            <div
                              class={`${mergedClsPrefix}-data-table-th__ellipsis`}
                            >
                              {renderTitle(column)}
                            </div>
                          ) // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                          : column.ellipsis && column.ellipsis.tooltip ? (
                            <NEllipsis
                              tooltip={column.ellipsis.tooltip}
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
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
        </table>
      </div>
    )
  }
})
