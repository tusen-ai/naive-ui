import { defineComponent, PropType, h, computed, inject } from 'vue'
import { ArrowDownIcon } from '../../../_base/icons'
import { NBaseIcon } from '../../../_base'
import RenderSorter from './RenderSorter'
import { DataTableInjection, TableColumnInfo } from '../interface'

export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    }
  },
  setup (props) {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
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
      if (value) return value.order
      return false
    })
    const mergedRenderSorterRef = computed(() => {
      return NDataTable.renderSorter
    })
    return {
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    }
  },
  render () {
    const { mergedRenderSorter, mergedSortOrder, active } = this
    return mergedRenderSorter ? (
      <RenderSorter
        render={mergedRenderSorter}
        order={mergedSortOrder}
        active={active}
      />
    ) : (
      <span
        class={[
          'n-data-table-sorter',
          {
            'n-data-table-sorter--asc': active && mergedSortOrder === 'ascend',
            'n-data-table-sorter--desc': active && mergedSortOrder === 'descend'
          }
        ]}
      >
        <NBaseIcon>{{ default: () => <ArrowDownIcon /> }}</NBaseIcon>
      </span>
    )
  }
})
