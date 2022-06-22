import { defineComponent, PropType, VNodeChild, h } from 'vue'
import { get } from 'lodash-es'
import type { MergedTheme } from '../../../_mixins'
import { NEllipsis } from '../../../ellipsis'
import type { DataTableTheme } from '../../styles'
import { TableBaseColumn, InternalRowData, SummaryCell } from '../interface'

export default defineComponent({
  name: 'DataTableCell',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    row: {
      type: Object as PropType<InternalRowData>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object as PropType<TableBaseColumn>,
      required: true
    },
    isSummary: Boolean,
    mergedTheme: {
      type: Object as PropType<MergedTheme<DataTableTheme>>,
      required: true
    },
    renderCell: Function as PropType<
    (value: any, rowData: object, column: any) => VNodeChild
    >
  },
  render () {
    const { isSummary, column, row, renderCell } = this
    let cell: VNodeChild
    const { render, key, ellipsis } = column
    if (render && !isSummary) {
      cell = render(row, this.index)
    } else {
      if (isSummary) {
        cell = (row[key] as SummaryCell).value
      } else {
        cell = renderCell
          ? renderCell(get(row, key), row, column)
          : (get(row, key) as any)
      }
    }
    if (ellipsis) {
      if (typeof ellipsis === 'object') {
        const { mergedTheme } = this
        return (
          <NEllipsis
            {...ellipsis}
            theme={mergedTheme.peers.Ellipsis}
            themeOverrides={mergedTheme.peerOverrides.Ellipsis}
          >
            {{ default: () => cell }}
          </NEllipsis>
        )
      } else {
        return (
          <span class={`${this.clsPrefix}-data-table-td__ellipsis`}>
            {cell}
          </span>
        )
      }
    }
    return cell
  }
})
