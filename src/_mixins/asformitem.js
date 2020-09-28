export default function (options = {}) {
  const {
    defaultSize = 'medium',
    syntheticSize
  } = options
  return {
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
    beforeUnmount () {
      const NFormItem = this.NFormItem
      if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
        NFormItem.restoreValidation()
      }
    },
    methods: {
      __triggerFormBlur () {
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
          NFormItem.onContentBlur()
        }
      },
      __triggerFormChange () {
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
          NFormItem.onContentChange()
        }
      },
      __triggerFormFocus () {
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
          NFormItem.onContentFocus()
        }
      },
      __triggerFormInput () {
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem !== '__FORM_ITEM_INNER__') {
          NFormItem.onContentInput()
        }
      }
    }
  }
}
