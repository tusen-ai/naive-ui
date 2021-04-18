import { defineComponent, PropType, h, computed, inject } from 'vue'
import { ArrowDownIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'
import RenderSorter from './RenderSorter'
import { dataTableInjectionKey, TableBaseColumn } from '../interface'
import { useConfig } from '../../../_mixins'

export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object as PropType<TableBaseColumn>,
      required: true
    }
  },
  setup (props) {
    const { NConfigProvider } = useConfig()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDataTable = inject(dataTableInjectionKey)!
    const sortStateRef = computed(() => {
      return NDataTable.mergedSortState
    })
    const activeRef = computed(() => {
      const { value } = sortStateRef
      if (value) return value.columnKey === props.column.key
      return false
    })
    const mergedSortOrderRef = computed(() => {
      const { value } = sortStateRef
      if (value) return activeRef.value ? value.order : false
      return false
    })
    const mergedRenderSorterRef = computed(() => {
      return (
        NConfigProvider?.mergedComponentProps?.DataTable?.renderSorter ||
        props.column.renderSorter
      )
    })
    return {
      NDataTable,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    }
  },
  render () {
    const {
      mergedRenderSorter,
      mergedSortOrder,
      NDataTable: { mergedClsPrefix }
    } = this
    return mergedRenderSorter ? (
      <RenderSorter render={mergedRenderSorter} order={mergedSortOrder} />
    ) : (
      <span
        class={[
          `${mergedClsPrefix}-data-table-sorter`,
          {
            [`${mergedClsPrefix}-data-table-sorter--asc`]:
              mergedSortOrder === 'ascend',
            [`${mergedClsPrefix}-data-table-sorter--desc`]:
              mergedSortOrder === 'descend'
          }
        ]}
      >
        <NBaseIcon clsPrefix={mergedClsPrefix}>
          {{ default: () => <ArrowDownIcon /> }}
        </NBaseIcon>
      </span>
    )
  }
})
