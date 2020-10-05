export default function (options = {}) {
  const {
    defaultSize = 'medium',
    mergedSize
  } = options
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
      __triggerFormBlur () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentBlur()
        }
      },
      __triggerFormChange () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentChange()
        }
      },
      __triggerFormFocus () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentFocus()
        }
      },
      __triggerFormInput () {
        const { NFormItem } = this
        if (NFormItem) {
          NFormItem.handleContentInput()
        }
      }
    }
  }
}
