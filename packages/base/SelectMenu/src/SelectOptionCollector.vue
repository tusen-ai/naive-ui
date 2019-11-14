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
    }
  },
  data () {
    return {
      options: [],
      stopCollecting: false,
      mounting: true
    }
  },
  watch: {
    options (value) {
      if (this.NSelect) {
        this.NSelect.collectedOptions = value
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
      children.forEach((child, index) => {
        const content = (child.componentOptions.children || []).map(c => c.text).join('').trim() || child.componentOptions.propsData.value
        child.key = child.componentOptions.propsData.value
        child.componentOptions.propsData = {
          label: content,
          ...child.componentOptions.propsData
        }
        this.options.push({
          ...child.componentOptions.propsData,
          render: (index) => {
            child.componentOptions.propsData.index = index
            return child
          }
        })
      })
    }
  },
  render (h) {
    const children = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    children.forEach((child, index) => {
      child.componentOptions.propsData.index = index
      child.componentOptions.propsData.show = false
    })
    return h('div', {
      staticClass: 'n-base-selector-option-collector',
      style: {
        display: 'none'
      }
    }, children)
  }
}
</script>
