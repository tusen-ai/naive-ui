import {
  h,
  ref,
  defineComponent,
  inject,
  VNode,
  watchEffect,
  onUnmounted,
  PropType
} from 'vue'
import { pxfy } from 'seemly'
import { VirtualList, VirtualListRef } from 'vueuc'
import { c } from '../../../_utils/cssr'
import { NScrollbar, ScrollbarInst } from '../../../scrollbar'
import { formatLength } from '../../../_utils'
import {
  dataTableInjectionKey,
  RowData,
  RowKey,
  SummaryRowData,
  MainTableBodyRef
} from '../interface'
import { createRowClassName, getColKey } from '../utils'
import Cell from './Cell'
import ExpandTrigger from './ExpandTrigger'
import RenderSafeCheckbox from './BodyCheckbox'

export default defineComponent({
  name: 'DataTableBody',
  props: {
    onResize: Function as PropType<(e: ResizeObserverEntry) => void>
  },
  setup (props) {
    const {
      treeMateRef,
      mergedCheckedRowKeysRef,
      mergedCheckedRowKeySetRef,
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
      rightActiveFixedColKeyRef,
      renderExpandRef,
      hoverKeyRef,
      summaryRef,
      mergedSortStateRef,
      virtualScrollRef,
      componentId,
      scrollPartRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doUpdateCheckedRowKeys
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListRef = ref<VirtualListRef | null>(null)
    function handleCheckboxUpdateChecked (
      tmNode: { key: RowKey },
      checked: boolean
    ): void {
      doUpdateCheckedRowKeys(
        (checked ? treeMateRef.value.check : treeMateRef.value.uncheck)(
          tmNode.key,
          mergedCheckedRowKeysRef.value
        ).checkedKeys
      )
    }
    function getScrollContainer (): HTMLElement | null {
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
      return value?.listRef as HTMLElement
    }
    function virtualListContent (): HTMLElement {
      const { value } = virtualListRef
      return value?.itemsRef as HTMLElement
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
    // manually control shadow style to avoid rerender
    const style = c([
      ({ props: cProps }: { props: Record<string, string> }) =>
        c([
          cProps.leftActiveFixedColKey === null
            ? null
            : c(
                `[data-n-id="${cProps.componentId}"] [data-col-key="${cProps.leftActiveFixedColKey}"]::after`,
                {
                  boxShadow: 'var(--box-shadow-after)'
                }
            ),
          cProps.rightActiveFixedColKey === null
            ? null
            : c(
                `[data-n-id="${cProps.componentId}"] [data-col-key="${cProps.rightActiveFixedColKey}"]::before`,
                {
                  boxShadow: 'var(--box-shadow-before)'
                }
            )
        ])
    ])
    watchEffect(() => {
      const { value: leftActiveFixedColKey } = leftActiveFixedColKeyRef
      const { value: rightActiveFixedColKey } = rightActiveFixedColKeyRef
      if (leftActiveFixedColKey !== null || rightActiveFixedColKey !== null) {
        style.mount({
          id: `n-${componentId}`,
          force: true,
          props: {
            leftActiveFixedColKey,
            rightActiveFixedColKey,
            componentId
          }
        })
      }
    })
    onUnmounted(() => {
      style.unmount({
        id: `n-${componentId}`
      })
    })
    return {
      componentId,
      scrollbarInstRef,
      virtualListRef,
      summary: summaryRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollX: scrollXRef,
      cols: colsRef,
      paginatedData: paginatedDataRef,
      rawPaginatedData: rawPaginatedDataRef,
      fixedColumnLeftMap: fixedColumnLeftMapRef,
      fixedColumnRightMap: fixedColumnRightMapRef,
      currentPage: mergedCurrentPageRef,
      mergedCheckedRowKeySet: mergedCheckedRowKeySetRef,
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeys: mergedExpandedRowKeysRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
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
      onResize,
      setHeaderScrollLeft
    } = this
    const contentStyle = {
      minWidth: formatLength(scrollX)
    }
    return (
      <NScrollbar
        ref="scrollbarInstRef"
        class={`${mergedClsPrefix}-data-table-base-table-body`}
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        contentStyle={contentStyle}
        container={virtualScroll ? this.virtualListContainer : undefined}
        content={virtualScroll ? this.virtualListContent : undefined}
        horizontalRailStyle={{ zIndex: 3 }}
        verticalRailStyle={{ zIndex: 3 }}
        xScrollable
        onScroll={virtualScroll ? undefined : this.handleTableBodyScroll}
        privateOnSetSL={setHeaderScrollLeft}
        onResize={onResize}
      >
        {{
          default: () => {
            let hasExpandedRows = false
            const cordToPass: Record<number, number[]> = {}
            // coord to related hover keys
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
              mergedExpandedRowKeys,
              componentId,
              handleMouseenterTable,
              handleMouseleaveTable,
              renderExpand,
              summary
            } = this
            const { length: colCount } = cols
            const { handleCheckboxUpdateChecked, handleUpdateExpanded } = this
            const rowIndexToKey: Record<number, RowKey> = {}
            paginatedData.forEach((tmNode, rowIndex) => {
              rowIndexToKey[rowIndex] = tmNode.key
            })
            const sorterKey =
              !!mergedSortState &&
              mergedSortState.order &&
              mergedSortState.columnKey
            type RowRenderInfo =
              | {
                summary: true
                rawNode: SummaryRowData
                key: RowKey
                disabled: boolean
              }
              | {
                summary?: never
                rawNode: RowData
                key: RowKey
                disabled: boolean
              }

            let mergedData: RowRenderInfo[]

            if (summary) {
              const summaryRows = summary(this.rawPaginatedData)
              if (Array.isArray(summaryRows)) {
                mergedData = [
                  ...paginatedData,
                  ...summaryRows.map((row, i) => ({
                    summary: true as const,
                    rawNode: row,
                    key: `__n_summary__${i}`,
                    disabled: true
                  }))
                ]
              } else {
                mergedData = [
                  ...paginatedData,
                  {
                    summary: true,
                    rawNode: summaryRows,
                    key: '__n_summary__',
                    disabled: true
                  }
                ]
              }
            } else {
              mergedData = paginatedData
            }

            const { length: rowCount } = mergedData

            const rows = mergedData.map((rowInfo, rowIndex) => {
              const {
                rawNode: rowData,
                key: rowKey,
                summary: isSummary
              } = rowInfo
              const expanded =
                renderExpand && mergedExpandedRowKeys.includes(rowKey)
              const colNodes = cols.map((col, colIndex) => {
                if (rowIndex in cordToPass) {
                  const cordOfRowToPass = cordToPass[rowIndex]
                  const indexInCordOfRowToPass = cordOfRowToPass.indexOf(
                    colIndex
                  )
                  if (~indexInCordOfRowToPass) {
                    cordOfRowToPass.splice(indexInCordOfRowToPass, 1)
                    return null
                  }
                }
                const { column } = col
                const colKey = getColKey(col)
                const { rowSpan, colSpan } = column
                const mergedColSpan = rowInfo.summary
                  ? rowInfo.rawNode[colKey].colSpan || 1
                  : colSpan
                    ? colSpan(rowData, rowIndex)
                    : 1
                const mergedRowSpan = rowInfo.summary
                  ? rowInfo.rawNode[colKey].rowSpan || 1
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
                  for (let i = rowIndex; i < rowIndex + mergedRowSpan; ++i) {
                    if (isCrossRowTd) {
                      cordKey[rowIndex][colIndex].push(rowIndexToKey[i])
                    }
                    for (let j = colIndex; j < colIndex + mergedColSpan; ++j) {
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
                return (
                  <td
                    key={colKey}
                    style={{
                      textAlign: column.align || undefined,
                      left: pxfy(fixedColumnLeftMap[colKey]),
                      right: pxfy(fixedColumnRightMap[colKey])
                    }}
                    colspan={mergedColSpan}
                    rowspan={mergedRowSpan}
                    data-col-key={colKey}
                    class={[
                      `${mergedClsPrefix}-data-table-td`,
                      column.className,
                      isSummary && `${mergedClsPrefix}-data-table-td--summary`,
                      ((hoverKey !== null &&
                        cordKey[rowIndex][colIndex].includes(hoverKey)) ||
                        (sorterKey !== false && sorterKey === colKey)) &&
                        `${mergedClsPrefix}-data-table-td--hover`,
                      column.fixed &&
                        `${mergedClsPrefix}-data-table-td--fixed-${column.fixed}`,
                      column.align &&
                        `${mergedClsPrefix}-data-table-td--${column.align}-align`,
                      {
                        [`${mergedClsPrefix}-data-table-td--ellipsis`]:
                          column.ellipsis === true ||
                          // don't add ellpisis class if tooltip exists
                          (column.ellipsis && !column.ellipsis.tooltip),
                        [`${mergedClsPrefix}-data-table-td--selection`]:
                          column.type === 'selection',
                        [`${mergedClsPrefix}-data-table-td--expand`]:
                          column.type === 'expand',
                        [`${mergedClsPrefix}-data-table-td--last-col`]: isLastCol,
                        [`${mergedClsPrefix}-data-table-td--last-row`]:
                          isLastRow && !expanded
                      }
                    ]}
                  >
                    {column.type === 'selection' ? (
                      !isSummary ? (
                        <RenderSafeCheckbox
                          key={currentPage}
                          rowKey={rowKey}
                          disabled={rowInfo.disabled}
                          onUpdateChecked={(checked) =>
                            handleCheckboxUpdateChecked(rowInfo, checked)
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
              })
              const row = (
                <tr
                  onMouseenter={() => {
                    this.hoverKey = rowKey
                  }}
                  key={rowKey}
                  class={[
                    `${mergedClsPrefix}-data-table-tr`,
                    createRowClassName(rowData, rowIndex, rowClassName)
                  ]}
                >
                  {colNodes}
                </tr>
              )
              if (expanded && renderExpand) {
                if (!hasExpandedRows) {
                  hasExpandedRows = true
                }
                return [
                  row,
                  <tr
                    class={`${mergedClsPrefix}-data-table-tr`}
                    key={`${rowKey}__expand`}
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
                      {renderExpand(rowData, rowIndex)}
                    </td>
                  </tr>
                ]
              }
              return row
            })

            // Please note that the current virtual scroll mode impl
            // not very performant, since it support all the feature of table.
            // If we can bailout some path it will be much faster. Since it
            // need to generate all vnode before use the virtual list.
            if (virtualScroll) {
              const VirtualListItemWrapper = defineComponent({
                render () {
                  return (
                    <table
                      class={`${mergedClsPrefix}-data-table-table`}
                      onMouseenter={handleMouseenterTable}
                      onMouseleave={handleMouseleaveTable}
                    >
                      <colgroup>
                        {cols.map((col) => (
                          <col key={col.key} style={col.style}></col>
                        ))}
                      </colgroup>
                      <tbody
                        data-n-id={componentId}
                        class={`${mergedClsPrefix}-data-table-tbody`}
                      >
                        {this.$slots}
                      </tbody>
                    </table>
                  )
                }
              })
              return (
                <VirtualList
                  ref="virtualListRef"
                  items={hasExpandedRows ? rows.flat() : rows}
                  itemSize={28}
                  visibleItemsTag={VirtualListItemWrapper}
                  showScrollbar={false}
                  onResize={this.handleVirtualListResize}
                  onScroll={this.handleVirtualListScroll}
                  itemsStyle={contentStyle}
                  itemResizable
                >
                  {{
                    default: ({ item }: { item: VNode }) => {
                      return item
                    }
                  }}
                </VirtualList>
              )
            }

            return (
              <table
                class={`${mergedClsPrefix}-data-table-table`}
                onMouseleave={handleMouseleaveTable}
                onMouseenter={handleMouseenterTable}
              >
                <colgroup>
                  {cols.map((col) => (
                    <col key={col.key} style={col.style}></col>
                  ))}
                </colgroup>
                <tbody
                  data-n-id={componentId}
                  class={`${mergedClsPrefix}-data-table-tbody`}
                >
                  {hasExpandedRows ? rows.flat() : rows}
                </tbody>
              </table>
            )
          }
        }}
      </NScrollbar>
    )
  }
})
