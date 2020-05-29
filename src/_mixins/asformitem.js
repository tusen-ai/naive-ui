export default function (events = {
  change: 'change',
  blur: 'blur',
  focus: 'focus'
}, defaultSize = 'medium', syntheticSize = null) {
  return {
    computed: {
      syntheticSize: syntheticSize || function () {
        const size = this.size
        if (size) return size
        const NFormItem = this.NFormItem
        if (
          NFormItem &&
          NFormItem !== '__FORM_ITEM_INNER__' &&
          NFormItem.syntheticSize
        ) {
          return NFormItem.syntheticSize
        }
        return defaultSize
      }
    },
    provide () {
      return {
        NFormItem: '__FORM_ITEM_INNER__'
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
          const NFormItem = this.NFormItem
          if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
            NFormItem.$emit(asEvent, value)
          }
        })
      })
    },
    beforeDestroy () {
      const NFormItem = this.NFormItem
      if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
        NFormItem._initData()
      }
    }
  }
}
