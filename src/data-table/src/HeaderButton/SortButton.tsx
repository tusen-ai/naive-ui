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
    const { mergedComponentPropsRef } = useConfig()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedSortStateRef, mergedClsPrefixRef } = inject(
      dataTableInjectionKey
    )!
    const sortStateRef = computed(() =>
      mergedSortStateRef.value.find(
        (state) => state.columnKey === props.column.key
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
        mergedComponentPropsRef?.value?.DataTable?.renderSorter ||
        props.column.renderSorter
      )
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    }
  },
  render () {
    const { mergedRenderSorter, mergedSortOrder, mergedClsPrefix } = this
    const { renderSorterIcon } = this.column
    return mergedRenderSorter ? (
      <RenderSorter render={mergedRenderSorter} order={mergedSortOrder} />
    ) : (
      <span
        class={[
          `${mergedClsPrefix}-data-table-sorter`,
          mergedSortOrder === 'ascend' &&
            `${mergedClsPrefix}-data-table-sorter--asc`,
          mergedSortOrder === 'descend' &&
            `${mergedClsPrefix}-data-table-sorter--desc`
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
