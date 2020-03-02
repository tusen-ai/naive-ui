export default function (events = {
  change: 'change',
  blur: 'blur',
  focus: 'focus'
}, defaultSize = 'medium') {
  return {
    computed: {
      syntheticSize () {
        const size = this.size
        if (size) return size
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem.syntheticSize) {
          return NFormItem.syntheticSize
        }
        return defaultSize
      }
    },
    provide () {
      return {
        NFormItem: null
      }
    },
    inject: {
      NFormItem: {
        default: null
      }
    },
    created () {
      Object.keys(events).forEach(event => {
        const asEvent = events[event]
        this.$on(event, function (value) {
          if (this.NFormItem) {
            this.NFormItem.$emit(asEvent, value)
          }
        })
      })
    },
    beforeDestroy () {
      if (this.NFormItem) {
        this.NFormItem._initData()
      }
    }
  }
}
