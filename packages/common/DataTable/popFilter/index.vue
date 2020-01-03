<template>
  <div class="n-filter-wraper">
    <n-popselect
      v-if="!loading && !error"
      v-model="value"
      cancelable
      :multiple="column.filterMultiple"
      :options="finalOptions"
      @change="onChange"
    >
      <template v-slot:activator>
        <filterIcon :active="active" />
      </template>
    </n-popselect>
    <n-popover v-else placement="bottom" trigger="click">
      <template v-slot:activator>
        <filterIcon :active="active" />
      </template>
      <p v-if="loading" class="n-filter-tip-line">
        <n-spin size="small" />
      </p>
      <p v-if="error" class="n-filter-tip-line" style="">
        Error,refresh
        <n-icon
          style="cursor:pointer"
          type="md-refresh"
          color="#999"
          size="18"
          @click.stop="initItems"
        >
          <md-refresh />
        </n-icon>
      </p>
    </n-popover>
  </div>
</template>

<script>
import filterIcon from '../filterIcon'
import mdRefresh from 'naive-ui/lib/icons/md-refresh'

export default {
  components: {
    filterIcon,
    mdRefresh
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
      loading: false,
      error: false
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
      this.error = false
      this.loading = true
      this.options().then(
        options => {
          this.finalOptions = options
          this.loading = false
        },
        err => {
          this.error = true
          this.loading = false
          console.error(err)
        }
      )
    },
    onChange (filters) {
      this.$emit('filter-change', {
        columnKey: this.column.key,
        filters
      })
    }
  }
}
</script>

<style scoped>
.n-filter-wraper {
  display: inline-block;
}
.n-filter-tip-line {
  text-align: center;
  padding: 5px;
}
</style>
