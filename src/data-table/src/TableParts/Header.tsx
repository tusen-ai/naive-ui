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
import CheckMenu from './CheckMenu'

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDataTable = inject(dataTableInjectionKey)!
    function handleCheckboxUpdateChecked (): void {
      if (NDataTable.someRowsChecked || NDataTable.allRowsChecked) {
        NDataTable.doUncheckAll()
      } else {
        NDataTable.doCheckAll()
      }
    }
    function handleColHeaderClick (
      e: MouseEvent,
      column: TableBaseColumn
    ): void {
      if (happensIn(e, 'dataTableFilter')) return
      if (!isColumnSortable(column)) return
      const activeSorter = NDataTable.mergedSortState
      const nextSorter = createNextSorter(column, activeSorter)
      NDataTable.doUpdateSorter(nextSorter)
    }
    return {
      NDataTable,
      headerStyle: {
        overflow: 'scroll'
      },
      handleCheckboxUpdateChecked,
      handleColHeaderClick
    }
  },
  render () {
    const {
      NDataTable: {
        mergedClsPrefix,
        scrollX,
        fixedColumnLeftMap,
        fixedColumnRightMap,
        currentPage,
        allRowsChecked,
        someRowsChecked,
        leftActiveFixedColKey,
        rightActiveFixedColKey,
        rows,
        cols,
        mergedTheme,
        checkOptions
      },
      headerStyle,
      handleColHeaderClick,
      handleCheckboxUpdateChecked
    } = this
    return (
      <div
        style={headerStyle}
        class={`${mergedClsPrefix}-data-table-base-table-header`}
        onScroll={this.onScroll}
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
          <thead class={`${mergedClsPrefix}-data-table-thead`}>
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
                        class={[
                          `${mergedClsPrefix}-data-table-th`,
                          column.fixed &&
                            `${mergedClsPrefix}-data-table-th--fixed-${column.fixed}`,
                          {
                            [`${mergedClsPrefix}-data-table-th--filterable`]: isColumnFilterable(
                              column
                            ),
                            [`${mergedClsPrefix}-data-table-th--sortable`]: isColumnSortable(
                              column
                            ),
                            [`${mergedClsPrefix}-data-table-th--shadow-after`]:
                              leftActiveFixedColKey === key,
                            [`${mergedClsPrefix}-data-table-th--shadow-before`]:
                              rightActiveFixedColKey === key,
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
                            {checkOptions ? <CheckMenu /> : null}
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
