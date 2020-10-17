export default function (options = {}) {
  const {
    defaultSize = 'medium',
    mergedSize
  } = options
  return {
    provide: {
      NFormItem: null
    },
    inject: {
      NFormItem: {
        default: null
      }
    },
    computed: {
      mergedSize: mergedSize || function () {
        const size = this.size
        if (size) return size
        const NFormItem = this.NFormItem
        if (
          NFormItem &&
          NFormItem.mergedSize
        ) {
          return NFormItem.mergedSize
        }
        return defaultSize
      }
    },
    beforeUnmount () {
      const { NFormItem } = this
      if (NFormItem) {
        NFormItem.restoreValidation()
      }
    },
    methods: {
      nTriggerFormBlur () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentBlur()
        }
      },
      nTriggerFormChange () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentChange()
        }
      },
      nTriggerFormFocus () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentFocus()
        }
      },
      nTriggerFormInput () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentInput()
        }
      }
    }
  }
}
