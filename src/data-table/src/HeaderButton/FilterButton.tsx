import { h, defineComponent, ref, computed, PropType, inject } from 'vue'
import { FilterIcon } from '../../../_base/icons'
import { NBaseIcon } from '../../../_base'
import { NPopover } from '../../../popover'
import RenderFilter from './RenderFilter'
import NDataTableFilterMenu from './FilterMenu'
import {
  ColumnKey,
  DataTableInjection,
  FilterOption,
  FilterOptionValue,
  FilterState,
  TableColumnInfo
} from '../interface'

function createFilterState (
  currentFilterState: FilterState,
  columnKey: ColumnKey,
  mergedFilterValue: FilterOptionValue | FilterOptionValue[] | null
): FilterState {
  const nextFilterState = Object.assign({}, currentFilterState)
  nextFilterState[columnKey] = mergedFilterValue
  return nextFilterState
}

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      default: []
    }
  },
  setup (props) {
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    const showPopoverRef = ref(false)
    const filterStateRef = computed(() => {
      return NDataTable.mergedActiveFilters
    })
    const filterMultipleRef = computed(() => {
      return props.column.filterMultiple !== false
    })
    const mergedFilterValueRef = computed(() => {
      const filterValue = filterStateRef.value[props.column.key]
      if (filterValue === undefined) {
        const { value: multiple } = filterMultipleRef
        if (multiple) return []
        else return null
      }
      return filterValue
    })
    const activeRef = computed(() => {
      const { value: filterValue } = mergedFilterValueRef
      if (Array.isArray(filterValue)) {
        return filterValue.length > 0
      }
      return filterValue !== null
    })
    const mergedRenderFilterRef = computed(() => {
      return NDataTable.renderFilter
    })
    function handleFilterChange (
      mergedFilterValue: FilterOptionValue | FilterOptionValue[] | null
    ): void {
      const nextActiveFilters = createFilterState(
        filterStateRef.value,
        props.column.key,
        mergedFilterValue
      )
      NDataTable.doUpdateFilters(nextActiveFilters, props.column)
    }
    function handleFilterMenuCancel (): void {
      showPopoverRef.value = false
    }
    function handleFilterMenuConfirm (): void {
      showPopoverRef.value = false
    }
    return {
      NDataTable,
      active: activeRef,
      showPopover: showPopoverRef,
      mergedRenderFilter: mergedRenderFilterRef,
      filterMultiple: filterMultipleRef,
      mergedFilterValue: mergedFilterValueRef,
      handleFilterChange,
      handleFilterMenuConfirm,
      handleFilterMenuCancel
    }
  },
  render () {
    const { NDataTable } = this
    const { mergedTheme } = NDataTable
    return (
      <NPopover
        show={this.showPopover}
        onUpdateShow={(v) => (this.showPopover = v)}
        trigger="click"
        unstableTheme={mergedTheme.peers.Popover}
        unstableThemeOverrides={mergedTheme.overrides.Popover}
        padded={false}
      >
        {{
          trigger: () =>
            this.mergedRenderFilter ? (
              <RenderFilter
                render={this.mergedRenderFilter}
                active={this.active}
                show={this.showPopover}
              />
            ) : (
              <div
                class={[
                  'n-data-table-filter',
                  {
                    'n-data-table-filter--active': this.active,
                    'n-data-table-filter--show': this.showPopover
                  }
                ]}
              >
                <NBaseIcon>{{ default: () => <FilterIcon /> }}</NBaseIcon>
              </div>
            ),
          default: () => (
            <NDataTableFilterMenu
              radioGroupName={String(this.column.key)}
              multiple={this.filterMultiple}
              value={this.mergedFilterValue}
              options={this.options}
              column={this.column}
              onChange={this.handleFilterChange}
              onCancel={this.handleFilterMenuCancel}
              onConfirm={this.handleFilterMenuConfirm}
            />
          )
        }}
      </NPopover>
    )
  }
})
