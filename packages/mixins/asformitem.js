export default function (events = {
  change: 'change',
  blur: 'blur',
  focus: 'focus'
}) {
  return {
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
