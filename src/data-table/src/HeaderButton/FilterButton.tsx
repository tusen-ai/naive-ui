import { h, defineComponent, ref, computed, PropType, inject } from 'vue'
import { FilterIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'
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
import { useConfig } from '../../../_mixins'

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
  name: 'DataTableFilterButton',
  props: {
    column: {
      type: Object as PropType<TableColumnInfo>,
      required: true
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      default: () => []
    }
  },
  setup (props) {
    const { NConfigProvider } = useConfig()
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    const showPopoverRef = ref(false)
    const filterStateRef = computed(() => {
      return NDataTable.mergedFilterState
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
      return (
        NConfigProvider?.mergedComponentProps?.DataTable?.renderFilter ||
        props.column.renderFilter
      )
    })
    function handleFilterChange (
      mergedFilterValue: FilterOptionValue | FilterOptionValue[] | null
    ): void {
      const nextFilterState = createFilterState(
        filterStateRef.value,
        props.column.key,
        mergedFilterValue
      )
      NDataTable.doUpdateFilters(nextFilterState, props.column)
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
        theme={mergedTheme.peers.Popover}
        themeOverrides={mergedTheme.peerOverrides.Popover}
        padded={false}
      >
        {{
          trigger: () =>
            this.mergedRenderFilter ? (
              <RenderFilter
                data-data-table-filter
                render={this.mergedRenderFilter}
                active={this.active}
                show={this.showPopover}
              />
            ) : (
              <div
                data-data-table-filter
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
          default: () => {
            const { renderFilterMenu } = this.column
            return renderFilterMenu ? (
              renderFilterMenu()
            ) : (
              <NDataTableFilterMenu
                style={NDataTable.filterMenuCssVars}
                radioGroupName={String(this.column.key)}
                multiple={this.filterMultiple}
                value={this.mergedFilterValue}
                options={this.options}
                column={this.column}
                onChange={this.handleFilterChange}
                onClear={this.handleFilterMenuCancel}
                onConfirm={this.handleFilterMenuConfirm}
              />
            )
          }
        }}
      </NPopover>
    )
  }
})
