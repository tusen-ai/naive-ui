import { computed, defineComponent, h, inject, type PropType } from 'vue'
import { NBaseIcon } from '../../../_internal'
import { ArrowDownIcon } from '../../../_internal/icons'
import { useConfig } from '../../../_mixins'
import { dataTableInjectionKey, type TableBaseColumn } from '../interface'
import RenderSorter from './RenderSorter'

export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object as PropType<TableBaseColumn>,
      required: true
    }
  },
  setup(props) {
    const { mergedComponentPropsRef } = useConfig()
    const { mergedSortStateRef, mergedClsPrefixRef } = inject(
      dataTableInjectionKey
    )!
    const sortStateRef = computed(() =>
      mergedSortStateRef.value.find(
        state => state.columnKey === props.column.key
      )
    )

    const activeRef = computed(() => {
      return sortStateRef.value !== undefined
    })
    const mergedSortOrderRef = computed(() => {
      const { value: sortState } = sortStateRef
      if (sortState && activeRef.value) {
        return sortState.order
      }
      return false
    })
    const mergedRenderSorterRef = computed(() => {
      return (
        mergedComponentPropsRef?.value?.DataTable?.renderSorter
        || props.column.renderSorter
      )
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    }
  },
  render() {
    const { mergedRenderSorter, mergedSortOrder, mergedClsPrefix } = this
    const { renderSorterIcon } = this.column
    return mergedRenderSorter ? (
      <RenderSorter render={mergedRenderSorter} order={mergedSortOrder} />
    ) : (
      <span
        class={[
          `${mergedClsPrefix}-data-table-sorter`,
          mergedSortOrder === 'ascend'
          && `${mergedClsPrefix}-data-table-sorter--asc`,
          mergedSortOrder === 'descend'
          && `${mergedClsPrefix}-data-table-sorter--desc`
        ]}
      >
        {renderSorterIcon ? (
          renderSorterIcon({ order: mergedSortOrder })
        ) : (
          <NBaseIcon clsPrefix={mergedClsPrefix}>
            {{ default: () => <ArrowDownIcon /> }}
          </NBaseIcon>
        )}
      </span>
    )
  }
})
