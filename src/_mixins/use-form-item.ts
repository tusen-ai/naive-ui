import { computed, inject, provide, onBeforeUnmount } from 'vue'

interface FormItemInjection {
  size: string | undefined
  mergedSize: string
  restoreValidation: () => void
  handleContentBlur: () => void
  handleContentFocus: () => void
  handleContentInput: () => void
  handleContentChange: () => void
}

interface UseFormItemOptions {
  defaultSize?: string
  mergedSize?: (formItem: FormItemInjection | null) => string
}

interface UseFormItemProps {
  size?: string
}

export default function useFormItem (
  props: UseFormItemProps,
  { defaultSize = 'medium', mergedSize }: UseFormItemOptions = {}
) {
  const NFormItem = inject<FormItemInjection | null>('NFormItem', null)
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
