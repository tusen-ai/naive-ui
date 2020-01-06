<template>
  <div class="n-filter-wraper">
    <n-popselect
      :value="value"
      cancelable
      :multiple="column.filterMultiple"
      :options="finalOptions"
      :loading="loading"
      @input="onPopselectInput"
    >
      <template v-slot:activator>
        <filterIcon :active="active" />
      </template>
    </n-popselect>
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
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data () {
    return {
      finalOptions: typeof this.options === 'function' ? [] : this.options,
      loading: false
    }
  },
  computed: {
    active () {
      if (Array.isArray(this.value)) return !!this.value.length
      return !!this.value
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
    },
    onPopselectInput (filters) {
      this.$emit('filter-change', {
        columnKey: this.column.key,
        filters
      })
    }
  }
}
</script>
