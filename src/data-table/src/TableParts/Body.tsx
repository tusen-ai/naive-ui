/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { pxfy, repeat } from 'seemly'
import { VirtualList, VirtualListInst } from 'vueuc'
import { c } from '../../../_utils/cssr'
import { NScrollbar, ScrollbarInst } from '../../../scrollbar'
import { formatLength } from '../../../_utils'
import {
  dataTableInjectionKey,
  RowKey,
  SummaryRowData,
  MainTableBodyRef,
  TmNode
} from '../interface'
import { createRowClassName, getColKey } from '../utils'
import Cell from './Cell'
import ExpandTrigger from './ExpandTrigger'
import RenderSafeCheckbox from './BodyCheckbox'
import TableHeader from './Header'
import type { ColItem } from '../use-group-header'

type RowRenderInfo =
  | {
    summary: true
    rawNode: SummaryRowData
    key: RowKey
    disabled: boolean
  }
  | TmNode

function flatten (rows: TmNode[], expandedRowKeys: RowKey[]): TmNode[] {
  const fRows: TmNode[] = []
  function traverse (rs: TmNode[]): void {
    rs.forEach((r) => {
      if (r.children && expandedRowKeys.includes(r.key)) {
        fRows.push(r)
        traverse(r.children)
      } else {
        fRows.push(r)
      }
    })
  }
  traverse(rows)
  return fRows
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
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>
  },
  render () {
    const { clsPrefix, id, cols, onMouseenter, onMouseleave } = this
    return (
      <table
        style={{ tableLayout: 'fixed' }}
        class={`${clsPrefix}-data-table-table`}
        onMouseenter={onMouseenter}
        onMouseleave={onMouseleave}
      >
        <colgroup>
          {cols.map((col) => (
            <col key={col.key} style={col.style}></col>
          ))}
        </colgroup>
        <tbody data-n-id={id} class={`${clsPrefix}-data-table-tbody`}>
          {this.$slots}
        </tbody>
      </table>
    )
  }
})

export default defineComponent({
  name: 'DataTableBody',
  props: {
    onResize: Function as PropType<(e: ResizeObserverEntry) => void>,
    showHeader: Boolean
  },
  setup (props) {
    const {
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
      tableLayoutRef,
      hasChildrenRef,
      firstContentfulColIndexRef,
      indentRef,
      setHeaderScrollLeft,
      doUpdateExpandedRowKeys,
      handleTableBodyScroll,
      doCheck,
      doUncheck
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListRef = ref<VirtualListInst | null>(null)
    function handleCheckboxUpdateChecked (
      tmNode: { key: RowKey },
      checked: boolean
    ): void {
      if (checked) {
        doCheck(tmNode.key)
      } else {
        doUncheck(tmNode.key)
      }
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
      return value?.listElRef as HTMLElement
    }
    function virtualListContent (): HTMLElement {
      const { value } = virtualListRef
      return value?.itemsElRef as HTMLElement
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
      rowClassName: rowClassNameRef,
      renderExpand: renderExpandRef,
      mergedExpandedRowKeys: mergedExpandedRowKeysRef,
      hoverKey: hoverKeyRef,
      mergedSortState: mergedSortStateRef,
      virtualScroll: virtualScrollRef,
      tableLayout: tableLayoutRef,
      hasChildren: hasChildrenRef,
      firstContentfulColIndex: firstContentfulColIndexRef,
      indent: indentRef,
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
              showHeader,
              hasChildren,
              firstContentfulColIndex,
              handleMouseenterTable,
              handleMouseleaveTable,
              renderExpand,
              summary,
              handleCheckboxUpdateChecked,
              handleUpdateExpanded
            } = this
            const { length: colCount } = cols
            const rowIndexToKey: Record<number, RowKey> = {}
            paginatedData.forEach((tmNode, rowIndex) => {
              rowIndexToKey[rowIndex] = tmNode.key
            })
            const sorterKey =
              !!mergedSortState &&
              mergedSortState.order &&
              mergedSortState.columnKey

            let mergedData: RowRenderInfo[]

            // if there is children in data, we should expand mergedData first

            const mergedPaginationData = hasChildren
              ? flatten(paginatedData, mergedExpandedRowKeys)
              : paginatedData

            if (summary) {
              const summaryRows = summary(this.rawPaginatedData)
              if (Array.isArray(summaryRows)) {
                mergedData = [
                  ...mergedPaginationData,
                  ...summaryRows.map((row, i) => ({
                    summary: true as const,
                    rawNode: row,
                    key: `__n_summary__${i}`,
                    disabled: true
                  }))
                ]
              } else {
                mergedData = [
                  ...mergedPaginationData,
                  {
                    summary: true,
                    rawNode: summaryRows,
                    key: '__n_summary__',
                    disabled: true
                  }
                ]
              }
            } else {
              mergedData = mergedPaginationData
            }

            const { length: rowCount } = mergedData

            let hasEllipsis = false

            const indentStyle = hasChildren
              ? { width: pxfy(this.indent) }
              : undefined

            const rows: VNode[] = []
            mergedData.forEach((rowInfo, rowIndex) => {
              const { rawNode: rowData, key: rowKey } = rowInfo
              const isSummary = 'summary' in rowInfo
              const expanded = mergedExpandedRowKeys.includes(rowKey)
              const showExpandContent = renderExpand && expanded
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
                // If there is no rowSpan
                // virtual list should have a fast path
                const { rowSpan, colSpan } = column
                const mergedColSpan = isSummary
                  ? (rowInfo.rawNode as SummaryRowData)[colKey].colSpan || 1
                  : colSpan
                    ? colSpan(rowData, rowIndex)
                    : 1
                const mergedRowSpan = isSummary
                  ? (rowInfo.rawNode as SummaryRowData)[colKey].rowSpan || 1
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
                const { ellipsis } = column
                if (!hasEllipsis && ellipsis) hasEllipsis = true
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
                          ellipsis === true ||
                          // don't add ellpisis class if tooltip exists
                          (ellipsis && !ellipsis.tooltip),
                        [`${mergedClsPrefix}-data-table-td--selection`]:
                          column.type === 'selection',
                        [`${mergedClsPrefix}-data-table-td--expand`]:
                          column.type === 'expand',
                        [`${mergedClsPrefix}-data-table-td--last-col`]: isLastCol,
                        [`${mergedClsPrefix}-data-table-td--last-row`]:
                          isLastRow && !showExpandContent
                      }
                    ]}
                  >
                    {hasChildren && colIndex === firstContentfulColIndex
                      ? [
                        repeat(
                          isSummary ? 0 : (rowInfo as TmNode).level,
                          <div
                            class={`${mergedClsPrefix}-data-table-indent`}
                            style={indentStyle}
                          />
                        ),
                        isSummary || !(rowInfo as TmNode).children ? (
                          <div
                            class={`${mergedClsPrefix}-data-table-expand-placeholder`}
                          />
                        ) : (
                          <ExpandTrigger
                            class={`${mergedClsPrefix}-data-table-expand-trigger`}
                            clsPrefix={mergedClsPrefix}
                            expanded={expanded}
                            onClick={() => {
                              handleUpdateExpanded(rowKey)
                            }}
                          />
                        )
                      ]
                      : null}
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
              if (showExpandContent) {
                rows.push(
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
                      {renderExpand!(rowData, rowIndex)}
                    </td>
                  </tr>
                )
              } else {
                rows.push(row)
              }
            })

            // Please note that the current virtual scroll mode impl
            // not very performant, since it supports all the feature of table.
            // If we can bailout some path it will be much faster. Since it
            // need to generate all vnodes before using the virtual list.
            if (virtualScroll) {
              return (
                <VirtualList
                  ref="virtualListRef"
                  items={rows}
                  itemSize={28}
                  visibleItemsTag={VirtualListItemWrapper}
                  visibleItemsProps={{
                    clsPrefix: mergedClsPrefix,
                    id: componentId,
                    cols,
                    onMouseenter: handleMouseenterTable,
                    onMouseleave: handleMouseleaveTable
                  }}
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
                style={{
                  tableLayout:
                    this.showHeader && !hasEllipsis ? this.tableLayout : 'fixed'
                }}
              >
                <colgroup>
                  {cols.map((col) => (
                    <col key={col.key} style={col.style}></col>
                  ))}
                </colgroup>
                {showHeader ? <TableHeader discrete={false} /> : null}
                <tbody
                  data-n-id={componentId}
                  class={`${mergedClsPrefix}-data-table-tbody`}
                >
                  {rows}
                </tbody>
              </table>
            )
          }
        }}
      </NScrollbar>
    )
  }
})
