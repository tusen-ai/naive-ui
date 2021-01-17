import { computed, inject, provide, onBeforeUnmount, ComputedRef } from 'vue'

type FormItemSize = 'small' | 'medium' | 'large'
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge'

interface FormItemInjection {
  mergedSize: FormItemSize
  restoreValidation: () => void
  handleContentBlur: () => void
  handleContentFocus: () => void
  handleContentInput: () => void
  handleContentChange: () => void
}

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize
  mergedSize?: (formItem: FormItemInjection | null) => T
}

interface UseFormItemProps<T> {
  size?: T
}

interface UseFormItem<T> {
  mergedSize: ComputedRef<T>
  nTriggerFormBlur: () => void
  nTriggerFormChange: () => void
  nTriggerFormFocus: () => void
  nTriggerFormInput: () => void
}

export default function useFormItem<T extends AllowedSize = FormItemSize> (
  props: UseFormItemProps<T>,
  { defaultSize = 'medium', mergedSize }: UseFormItemOptions<T> = {}
): UseFormItem<T> {
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
            return (mergedSize as unknown) as T
          }
        }
        return (defaultSize as unknown) as T
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
