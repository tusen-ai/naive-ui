import { h, ref, defineComponent, inject } from 'vue'
import { NCheckbox } from '../../../checkbox'
import { NScrollbar, ScrollbarRef } from '../../../scrollbar'
import { formatLength } from '../../../_utils'
import { DataTableInjection, MainTableInjection, TableNode } from '../interface'
import {
  createCustomWidthStyle,
  setCheckStatusOfRow,
  createRowKey,
  createRowClassName
} from '../utils'
import Cell from './Cell'

export default defineComponent({
  name: 'DataTableBody',
  setup () {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    const NMainTable = inject<MainTableInjection>(
      'NMainTable'
    ) as MainTableInjection
    const scrollbarInstRef = ref<ScrollbarRef | null>(null)
    function handleCheckboxUpdateChecked (
      row: TableNode,
      checked: boolean
    ): void {
      const newCheckedRowKeys = Array.from(NDataTable.mergedCheckedRowKeys)
      setCheckStatusOfRow(newCheckedRowKeys, row, checked, NDataTable.rowKey)
      NDataTable.doUpdateCheckedRowKeys(newCheckedRowKeys)
    }
    function getScrollContainer (): HTMLElement | null {
      const { value } = scrollbarInstRef
      if (value) return value.containerRef
      return null
    }
    function handleScroll (event: Event): void {
      NDataTable.handleTableBodyScroll(event)
    }
    return {
      NDataTable,
      NMainTable,
      scrollbarInstRef,
      getScrollContainer,
      handleScroll,
      handleCheckboxUpdateChecked
    }
  },
  render () {
    const { NDataTable, NMainTable, handleScroll } = this
    const { mergedTheme, scrollX } = NDataTable
    return (
      <NScrollbar
        ref="scrollbarInstRef"
        class="n-data-table-base-table-body"
        unstableTheme={mergedTheme.peers.Scrollbar}
        unstableThemeOverrides={mergedTheme.overrides.Scrollbar}
        contentStyle={{
          minWidth: formatLength(scrollX)
        }}
        horizontalRailStyle={{ zIndex: 3 }}
        verticalRailStyle={{ zIndex: 3 }}
        xScrollable
        onScroll={handleScroll}
      >
        <table ref="body" class="n-data-table-table">
          <colgroup>
            {NDataTable.columns.map((column, index) => (
              <col
                key={column.key}
                style={createCustomWidthStyle(column, index)}
              ></col>
            ))}
          </colgroup>
          <tbody ref="tbody" class="n-data-table-tbody">
            {NDataTable.paginatedData.map((row, index) => {
              const { handleCheckboxUpdateChecked } = this
              const {
                columns,
                fixedColumnLeftMap,
                fixedColumnRightMap,
                currentPage,
                mergedCheckedRowKeys,
                rowKey,
                rowClassName
              } = NDataTable
              const {
                leftActiveFixedColKey,
                rightActiveFixedColKey
              } = NMainTable
              return (
                <tr
                  key={createRowKey(row, rowKey)}
                  class={[
                    'n-data-table-tr',
                    createRowClassName(row, index, rowClassName)
                  ]}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        textAlign: column.align || undefined,
                        left: fixedColumnLeftMap[column.key],
                        right: fixedColumnRightMap[column.key]
                      }}
                      class={[
                        'n-data-table-td',
                        column.className,
                        column.fixed &&
                          `n-data-table-td--fixed-${column.fixed}`,
                        column.align &&
                          `n-data-table-td--${column.align}-align`,
                        {
                          'n-data-table-td--ellipsis': column.ellipsis,
                          'n-data-table-td--shadow-after':
                            leftActiveFixedColKey === column.key,
                          'n-data-table-td--shadow-before':
                            rightActiveFixedColKey === column.key,
                          'n-data-table-td--selection':
                            column.type === 'selection'
                        }
                      ]}
                    >
                      {column.type === 'selection' ? (
                        <NCheckbox
                          key={currentPage}
                          disabled={column.disabled?.(row)}
                          checked={mergedCheckedRowKeys.includes(
                            createRowKey(row, rowKey)
                          )}
                          onUpdateChecked={(checked) =>
                            handleCheckboxUpdateChecked(row, checked)
                          }
                        />
                      ) : (
                        <Cell index={index} row={row} column={column} />
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </NScrollbar>
    )
  }
})
