import { h, defineComponent, ref, computed, PropType, inject } from 'vue'
import { FilterIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'
import { NPopover } from '../../../popover'
import RenderFilter from './RenderFilter'
import NDataTableFilterMenu from './FilterMenu'
import {
  ColumnKey,
  dataTableInjectionKey,
  FilterOption,
  FilterOptionValue,
  FilterState,
  TableBaseColumn
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
      type: Object as PropType<TableBaseColumn>,
      required: true
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      default: () => []
    }
  },
  setup (props) {
    const { NConfigProvider } = useConfig()
    const {
      mergedThemeRef,
      mergedClsPrefixRef,
      mergedFilterStateRef,
      filterMenuCssVarsRef,
      doUpdateFilters
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    const showPopoverRef = ref(false)
    const filterStateRef = mergedFilterStateRef
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
        NConfigProvider?.mergedComponentPropsRef.value?.DataTable
          ?.renderFilter || props.column.renderFilter
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
      doUpdateFilters(nextFilterState, props.column)
    }
    function handleFilterMenuCancel (): void {
      showPopoverRef.value = false
    }
    function handleFilterMenuConfirm (): void {
      showPopoverRef.value = false
    }
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      showPopover: showPopoverRef,
      mergedRenderFilter: mergedRenderFilterRef,
      filterMultiple: filterMultipleRef,
      mergedFilterValue: mergedFilterValueRef,
      filterMenuCssVars: filterMenuCssVarsRef,
      handleFilterChange,
      handleFilterMenuConfirm,
      handleFilterMenuCancel
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix } = this
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
                  `${mergedClsPrefix}-data-table-filter`,
                  {
                    [`${mergedClsPrefix}-data-table-filter--active`]: this
                      .active,
                    [`${mergedClsPrefix}-data-table-filter--show`]: this
                      .showPopover
                  }
                ]}
              >
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{ default: () => <FilterIcon /> }}
                </NBaseIcon>
              </div>
            ),
          default: () => {
            const { renderFilterMenu } = this.column
            return renderFilterMenu ? (
              renderFilterMenu()
            ) : (
              <NDataTableFilterMenu
                style={this.filterMenuCssVars}
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
