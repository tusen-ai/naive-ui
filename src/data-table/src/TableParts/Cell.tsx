import { defineComponent, PropType, VNodeChild, h } from 'vue'
import type { MergedTheme } from '../../../_mixins'
import { NEllipsis } from '../../../ellipsis'
import { TableColumnInfo, TableNode } from '../interface'
import type { DataTableTheme } from '../../styles'

export default defineComponent({
  name: 'DataTableCell',
  props: {
    row: {
      type: Object as PropType<TableNode>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    },
    mergedTheme: {
      type: Object as PropType<MergedTheme<DataTableTheme>>,
      required: true
    }
  },
  render () {
    const {
      column: { render, key, ellipsis },
      row
    } = this
    let cell: VNodeChild
    if (render) {
      cell = render(row, this.index)
    } else {
      cell = row[key] as any
    }
    const tooltip = typeof ellipsis === 'object' ? ellipsis.tooltip : undefined
    if (tooltip) {
      const { mergedTheme } = this
      return (
        <NEllipsis
          tooltip={tooltip}
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
