import { h, defineComponent, inject, PropType, VNodeChild } from 'vue'
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
  DataTableInjection,
  TableExpandColumn,
  TableSelectionColumn,
  TableColumnGroup,
  TableBaseColumn
} from '../interface'

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
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    function handleCheckboxUpdateChecked (column: TableSelectionColumn): void {
      if (NDataTable.someRowsChecked || NDataTable.allRowsChecked) {
        NDataTable.doUncheckAll(column)
      } else {
        NDataTable.doCheckAll(column)
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
        mergedTheme
      },
      headerStyle,
      handleColHeaderClick,
      handleCheckboxUpdateChecked
    } = this
    return (
      <div
        style={headerStyle}
        class="n-data-table-base-table-header"
        onScroll={this.onScroll}
      >
        <table
          ref="body"
          class="n-data-table-table"
          style={{ minWidth: formatLength(scrollX) }}
        >
          <colgroup>
            {cols.map((col) => (
              <col key={col.key} style={col.style} />
            ))}
          </colgroup>
          <thead class="n-data-table-thead">
            {rows.map((row) => {
              return (
                <tr class="n-data-table-tr">
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
                          'n-data-table-th',
                          column.fixed &&
                            `n-data-table-th--fixed-${column.fixed}`,
                          {
                            'n-data-table-th--filterable': isColumnFilterable(
                              column
                            ),
                            'n-data-table-th--sortable': isColumnSortable(
                              column
                            ),
                            'n-data-table-th--shadow-after':
                              leftActiveFixedColKey === key,
                            'n-data-table-th--shadow-before':
                              rightActiveFixedColKey === key,
                            'n-data-table-th--selection':
                              column.type === 'selection',
                            'n-data-table-th--last': isLast
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
                          <NCheckbox
                            key={currentPage}
                            tableHeader
                            checked={allRowsChecked}
                            indeterminate={someRowsChecked}
                            onUpdateChecked={() =>
                              handleCheckboxUpdateChecked(column)
                            }
                          />
                        ) : column.ellipsis === true ||
                          (column.ellipsis && !column.ellipsis.tooltip) ? (
                            <div class="n-data-table-th__ellipsis">
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
