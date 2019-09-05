<template>
  <div class="n-filter-wraper">
    <n-popselect
      v-if="!loading && !error"

      v-model="selectedValue"
      cancelable
      :multiple="column.filterMultiple"
      :options="filterItems"
      @change="onSelectedChange"
    >
      <template v-slot:activator>
        <filterIcon :status="filterStatus" />
      </template>
    <!-- <n-popselect-option
      v-if="loading"
      disabled
      label="Loading.."
      value="loading.."
    />
    <p
      v-if="error"
      style="text-align:center;padding:5px;"
    >
      Error,refresh
      <n-icon
        style="cursor:pointer"
        type="md-refresh"
        color="#999"
        size="18"
        @click.stop="initItems"
      />
    </p> -->
    <!-- <n-scrollbar
      style="max-height:120px;"
    > -->
    <!-- <n-popselect-option
        v-for="item in filterItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      /> -->
    <!-- </n-scrollbar> -->
    </n-popselect>
    <n-popover
      v-else
      placement="bottom"
      trigger="click"
    >
      <template v-slot:activator>
        <filterIcon :status="filterStatus" />
      </template>
      <p
        v-if="loading"
        class="n-filter-tip-line"
      >
        Loading...
      </p>
      <p
        v-if="error"
        class="n-filter-tip-line"
        style=""
      >
        Error,refresh
        <n-icon
          style="cursor:pointer"
          type="md-refresh"
          color="#999"
          size="18"
          @click.stop="initItems"
        />
      </p>
    </n-popover>
  </div>
</template>

<script>
import filterIcon from '../filterIcon'

export default {
  components: {
    filterIcon
  },
  props: {
    value: {
      required: true,
      validator () {
        return true
      }
    },
    column: {
      type: Object,
      required: true
    },
    items: {
      type: [Array, Function],
      required: true
    }
  },
  data () {
    const selectedValue = this.value || null
    return {
      selectedValue: selectedValue,
      filterItems: [],
      loading: false,
      error: false
    }
  },
  computed: {
    filterStatus () {
      return this.selectedValue !== null && this.selectedValue !== undefined && this.selectedValue.length !== 0
    }
  },
  watch: {
    items (val, oldVal) {
      this.initItems()
    },
    value (val, oldVal) {
      if (val !== oldVal) {
        this.selectedValue = val
      }
    }
  },
  created () {
    this.initItems()
  },
  methods: {
    initItems () {
      this.error = false
      if (typeof this.items === 'function') {
        this.loading = true
        this.items().then((items) => {
          this.filterItems = items
          this.loading = false
        }, (err) => {
          console.error(err)
          this.error = true
          this.loading = false
          throw err
        })
      } else {
        this.filterItems = this.items
      }
    },
    onSelectedChange (val) {
      this.$emit('input', val)
      this.$emit('on-filter', val, this.column)
    }
  }
}
</script>

<style scoped>
.n-filter-wraper {
  display: inline-block;
}
.n-filter-tip-line{
  text-align:center;
  padding:5px;
}
</style>
