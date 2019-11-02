export default function (events = {
  change: 'change',
  blur: 'blur',
  focus: 'focus',
  input: 'input'
}) {
  return {
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
    }
  }
}
