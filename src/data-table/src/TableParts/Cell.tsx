import type { PropType, VNodeChild } from 'vue'
import type { MergedTheme } from '../../../_mixins'
import type { DataTableTheme } from '../../styles'
import type {
  CellSlotName,
  InternalRowData,
  SummaryCell,
  TableBaseColumn
} from '../interface'
import { get } from 'lodash-es'
import { defineComponent, h, inject } from 'vue'
import NEllipsis from '../../../ellipsis/src/Ellipsis'
import { NPerformantEllipsis } from '../../../ellipsis/src/PerformantEllipsis'
import { dataTableInjectionKey } from '../interface'

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
  setup() {
    const { slots: dataTableSlots } = inject(dataTableInjectionKey)!

    return {
      dataTableSlots
    }
  },
  render() {
    const { isSummary, column, row, renderCell, dataTableSlots } = this

    const { render, key, ellipsis } = column

    const slotName = `cell-${key}` as CellSlotName

    if (dataTableSlots[slotName]) {
      return dataTableSlots[slotName]({ row, column })
    }

    let cell: VNodeChild
    if (render && !isSummary) {
      cell = render(row, this.index)
    }
    else {
      if (isSummary) {
        cell = (row[key] as SummaryCell)?.value
      }
      else {
        cell = renderCell
          ? renderCell(get(row, key), row, column)
          : get(row, key)
      }
    }
    if (ellipsis) {
      if (typeof ellipsis === 'object') {
        const { mergedTheme } = this
        if (column.ellipsisComponent === 'performant-ellipsis') {
          return (
            <NPerformantEllipsis
              {...ellipsis}
              theme={mergedTheme.peers.Ellipsis}
              themeOverrides={mergedTheme.peerOverrides.Ellipsis}
            >
              {{ default: () => cell }}
            </NPerformantEllipsis>
          )
        }
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
      else {
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
