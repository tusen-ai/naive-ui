import { defineComponent, PropType, VNodeChild, h } from 'vue'
import { get } from 'lodash-es'
import type { MergedTheme } from '../../../_mixins'
import { NEllipsis } from '../../../ellipsis'
import { TableBaseColumn, InternalRowData, SummaryCell } from '../interface'
import type { DataTableTheme } from '../../styles'

export default defineComponent({
  name: 'DataTableCell',
  props: {
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
    }
  },
  render () {
    const {
      isSummary,
      column: { render, key, ellipsis },
      row
    } = this
    let cell: VNodeChild
    if (render && !isSummary) {
      cell = render(row, this.index)
    } else {
      if (isSummary) {
        cell = (row[key] as SummaryCell).value
      } else {
        cell = get(row, key) as any
      }
    }
    if (ellipsis && typeof ellipsis === 'object') {
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
    }
    return cell
  }
})
