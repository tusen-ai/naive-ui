<script>
export default {
  name: 'NBaseSelectOptionCollector',
  provide () {
    return {
      NBaseSelectOptionCollector: this
    }
  },
  inject: {
    NSelect: {
      default: null
    },
    NAutoComplete: {
      default: null
    },
    NDropdownMenu: {
      default: null
    }
  },
  data () {
    return {
      options: [],
      stopCollecting: false,
      mounting: true
    }
  },
  computed: {
    injection () {
      if (this.NSelect) return this.NSelect
      if (this.NAutoComplete) return this.NAutoComplete
      if (this.NDropdownMenu) return this.NDropdownMenu
      return null
    }
  },
  watch: {
    options (value) {
      if (this.injection) {
        this.injection.collectedOptions = value
      }
    }
  },
  mounted () {
    this.mounting = false
    this.collectOptions()
  },
  beforeDestroy () {
    this.stopCollecting = true
  },
  methods: {
    collectOptions (force) {
      if (this.stopCollecting || this.mounting) return
      this.options = []
      const children = this.$scopedSlots.default ? this.$scopedSlots.default() : []
      children.forEach(child => {
        child.key = child.componentOptions.propsData.value
        this.options.push(child.componentOptions.propsData)
      })
    }
  },
  render (h) {
    const children = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    return h('div', {
      staticClass: 'n-base-selector-option-collector',
      style: {
        display: 'none'
      }
    }, children)
  }
}
</script>
