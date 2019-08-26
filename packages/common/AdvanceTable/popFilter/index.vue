<template>
  <n-popselect
    v-model="selectedValue"
    cancelable
    :multiple="column.filterMultiple"
    @change="onSelectedChange"
  >
    <template v-slot:activator>
      <filterIcon :status="filterStatus" />
    </template>
    <n-popselect-option
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
    </p>
    <n-scrollbar style="max-height:120px;">
      <n-popselect-option
        v-for="item in filterItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </n-scrollbar>
  </n-popselect>
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
      console.log('TCL: items -> val,oldVal', val, oldVal)
      this.initItems()
    },
    value (val, oldVal) {
      console.log('TCL: value -> val, oldVal', val, oldVal)
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

<style>

</style>
