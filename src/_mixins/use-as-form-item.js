import { computed, inject, provide, onBeforeUnmount } from 'vue'

export default function useFormItem (props, options = {}) {
  const { defaultSize = 'medium', mergedSize } = options
  const NFormItem = inject('NFormItem', null)
  provide('NFormItem', null)
  const mergedSizeRef = computed(
    mergedSize
      ? () => mergedSize(NFormItem)
      : () => {
        const { size } = props
        if (size) return size
        if (NFormItem) {
          const { mergedSize } = NFormItem
          if (mergedSize) {
            return mergedSize
          }
        }
        return defaultSize
      }
  )
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation()
    }
  })
  return {
    mergedSize: mergedSizeRef,
    nTriggerFormBlur () {
      if (NFormItem) {
        NFormItem.handleContentBlur()
      }
    },
    nTriggerFormChange () {
      if (NFormItem) {
        NFormItem.handleContentChange()
      }
    },
    nTriggerFormFocus () {
      if (NFormItem) {
        NFormItem.handleContentFocus()
      }
    },
    nTriggerFormInput () {
      if (NFormItem) {
        NFormItem.handleContentInput()
      }
    }
  }
}
