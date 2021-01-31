import { h, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../../checkbox'
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import {
  isColumnSortable,
  isColumnFilterable,
  createCustomWidthStyle,
  createNextSorter
} from '../utils'
import {
  DataTableInjection,
  MainTableInjection,
  TableColumnInfo
} from '../interface'

export default defineComponent({
  name: 'DataTableHeader',
  props: {
    onScroll: Function as PropType<(e: Event) => void>
  },
  setup () {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    const NMainTable = inject<MainTableInjection>(
      'NMainTable'
    ) as MainTableInjection
    function handleCheckboxUpdateChecked (column: TableColumnInfo): void {
      if (NDataTable.someRowsChecked || NDataTable.allRowsChecked) {
        NDataTable.doUncheckAll(column)
      } else {
        NDataTable.doCheckAll(column)
      }
    }
    function handleHeaderClick (e: MouseEvent, column: TableColumnInfo): void {
      // let filterRef = this.$refs[`${column.key}Filter`]
      // if (Array.isArray(filterRef)) filterRef = filterRef[0]
      // const filterElement = filterRef && filterRef.$el
      // if (filterElement && filterElement.contains(e.target)) return

      // I need to make filter click do not trigger resort

      if (!isColumnSortable(column)) return
      const activeSorter = NDataTable.mergedActiveSorter
      const nextSorter = createNextSorter(activeSorter)
      NDataTable.doUpdateSorter(nextSorter)
    }
    return {
      NDataTable,
      NMainTable,
      headerStyle: {
        overflow: 'scroll'
      },
      handleCheckboxUpdateChecked,
      handleHeaderClick
    }
  },
  render () {
    const {
      NDataTable: {
        columns,
        fixedColumnLeftMap,
        fixedColumnRightMap,
        currentPage,
        allRowsChecked,
        someRowsChecked
      },
      NMainTable: { leftActiveFixedColKey, rightActiveFixedColKey },
      headerStyle,
      handleHeaderClick,
      handleCheckboxUpdateChecked
    } = this
    return (
      <div
        style={this.headerStyle}
        class="n-data-table-base-table-header"
        onScroll={this.onScroll}
      >
        <table ref="body" class="n-data-table-table" style={headerStyle}>
          <colgroup>
            {columns.map((column, index) => (
              <col
                key={column.key}
                style={createCustomWidthStyle(column, index)}
              />
            ))}
          </colgroup>
          <thead class="n-data-table-thead">
            <tr class="n-data-table-tr">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  style={{
                    textAlign: column.align,
                    left: fixedColumnLeftMap[column.key],
                    right: fixedColumnRightMap[column.key]
                  }}
                  class={[
                    'n-data-table-th',
                    column.fixed && `n-data-table-th--fixed-${column.fixed}`,
                    {
                      'n-data-table-th--filterable': isColumnFilterable(column),
                      'n-data-table-th--sortable': isColumnSortable(column),
                      'n-data-table-th--shadow-after':
                        leftActiveFixedColKey === column.key,
                      'n-data-table-th--shadow-before':
                        rightActiveFixedColKey === column.key,
                      'n-data-table-th--selection': column.type === 'selection'
                    }
                  ]}
                  onClick={(e) => handleHeaderClick(e, column)}
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
                  ) : column.ellipsis ? (
                    <div class="n-data-table-th__ellipsis">
                      {typeof column.title === 'function'
                        ? column.title(column, index)
                        : column.title}
                    </div>
                  ) : typeof column.title === 'function' ? (
                    column.title(column, index)
                  ) : (
                    column.title
                  )}
                  {isColumnSortable(column) ? (
                    <SortButton column={column} />
                  ) : null}
                  {isColumnFilterable(column) ? (
                    <FilterButton
                      column={column}
                      options={column.filterOptions}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    )
  }
})
