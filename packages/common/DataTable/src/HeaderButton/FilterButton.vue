<template>
  <div
    class="n-data-table-filter-button"
    :class="{
      'n-data-table-filter-button--active': active,
      'n-data-table-filter-button--popover-visible': popoverVisible
    }"
  >
    <n-popselect
      :value="activeFilterOptionValues"
      cancelable
      :arrow="false"
      :multiple="column.filterMultiple === false ? false : true"
      :options="finalOptions"
      :loading="loading"
      @input="handleFilterChange"
      @show="popoverVisible = true"
      @hide="popoverVisible = false"
    >
      <template v-slot:activator>
        <div class="n-data-table-filter-button__icon-wrapper">
          <n-icon>
            <ios-funnel />
          </n-icon>
        </div>
      </template>
    </n-popselect>
  </div>
</template>

<script>
import NIcon from '../../../Icon'
import iosFunnel from '../../../../icons/ios-funnel'

function createFilterOptionValues (activeFilters, column) {
  const activeFilterOptionValues = activeFilters.filter(filter => filter.columnKey === column.key).map(filter => filter.filterOptionValue)
  /** default is multiple */
  if (column.filterMultiple !== false) {
    return activeFilterOptionValues
  }
  return activeFilterOptionValues[0]
}

function createActiveFilters (allFilters, columnKey, filters) {
  allFilters = allFilters.filter(filter => filter.columnKey !== columnKey)
  if (!Array.isArray(filters)) {
    filters = [filters]
  }
  return allFilters.concat(filters.map(filter => ({
    columnKey,
    filterOptionValue: filter
  })))
}

export default {
  inject: {
    NDataTable: {
      default: null
    }
  },
  components: {
    NIcon,
    iosFunnel
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data () {
    return {
      finalOptions: typeof this.options === 'function' ? [] : this.options,
      loading: false,
      popoverVisible: false
    }
  },
  computed: {
    activeFilters () {
      return this.NDataTable.synthesizedActiveFilters
    },
    activeFilterOptionValues () {
      return createFilterOptionValues(this.activeFilters, this.column)
    },
    active () {
      if (Array.isArray(this.activeFilterOptionValues)) return !!this.activeFilterOptionValues.length
      return !!this.activeFilterOptionValues
    }
  },
  watch: {
    options (value) {
      if (typeof this.options === 'function') {
        this.asyncInitializeOptions()
      } else {
        this.finalOptions = value
      }
    }
  },
  mounted () {
    if (typeof this.options === 'function') {
      this.asyncInitializeOptions()
    }
  },
  methods: {
    handleFilterChange (filterOptionValues) {
      const nextActiveFilters = createActiveFilters(
        this.activeFilters,
        this.column.key,
        filterOptionValues
      )
      this.NDataTable.changeFilters(nextActiveFilters, this.column)
    },
    asyncInitializeOptions () {
      this.loading = true
      this.options().then(
        options => {
          this.finalOptions = options
          this.loading = false
        },
        err => {
          this.loading = false
          console.error(err)
        }
      )
    }
  }
}
</script>
