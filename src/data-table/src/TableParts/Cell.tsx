import { defineComponent, PropType, VNodeChild, ref, h } from 'vue'
import { get, cloneDeep } from 'lodash-es'
import type { MergedTheme } from '../../../_mixins'
import { NEllipsis, ellipsisProps } from '../../../ellipsis'
import type { DataTableTheme } from '../../styles'
import { TableBaseColumn, InternalRowData, SummaryCell } from '../interface'
import { call } from '../../../_utils'

const ShowOrTooltip = defineComponent({
  props: ellipsisProps,
  setup (props, { slots }) {
    const tooltip = ref()
    tooltip.value = false
    return () =>
      h(
        'div',
        {
          onMouseover: () => {
            const onUpdateShow = (value: boolean): void => {
              if (!value) {
                tooltip.value = false
              }
            }
            let tooltipProps = cloneDeep(props.tooltip)
            if (typeof tooltipProps === 'object') {
              if (tooltipProps.onUpdateShow) {
                const _onUpdateShow = tooltipProps.onUpdateShow
                tooltipProps.onUpdateShow = (value: boolean): void => {
                  call(_onUpdateShow, value)
                  call(onUpdateShow, value)
                }
              } else {
                tooltipProps.onUpdateShow = onUpdateShow
              }
            } else {
              if (props.tooltip === true) {
                tooltipProps = { onUpdateShow }
              }
            }
            tooltip.value = tooltipProps
          }
        },
        h(
          NEllipsis,
          {
            ...props,
            tooltip: tooltip.value
          },
          { default: slots.default }
        )
      )
  }
})

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
          : get(row, key)
      }
    }
    if (ellipsis) {
      if (typeof ellipsis === 'object') {
        const { mergedTheme } = this
        if (ellipsis.tooltip) {
          return (
            <ShowOrTooltip
              {...ellipsis}
              theme={mergedTheme.peers.Ellipsis}
              themeOverrides={mergedTheme.peerOverrides.Ellipsis}
            >
              {{ default: () => cell }}
            </ShowOrTooltip>
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
