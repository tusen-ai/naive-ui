import {
  computed,
  inject,
  provide,
  onBeforeUnmount,
  type ComputedRef,
  type Ref
} from 'vue'
import type { FormValidationStatus } from '../form/src/interface'
import { createInjectionKey } from '../_utils'

type FormItemSize = 'small' | 'medium' | 'large'
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | number

export interface FormItemInjection {
  path: Ref<string | undefined>
  disabled: Ref<boolean>
  mergedSize: ComputedRef<FormItemSize>
  mergedValidationStatus: ComputedRef<FormValidationStatus | undefined>
  restoreValidation: () => void
  handleContentBlur: () => void
  handleContentFocus: () => void
  handleContentInput: () => void
  handleContentChange: () => void
}

export const formItemInjectionKey =
  createInjectionKey<FormItemInjection | null>('n-form-item')

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize
  mergedSize?: (formItem: FormItemInjection | null) => T
  mergedDisabled?: (formItem: FormItemInjection | null) => boolean
}

interface UseFormItemProps<T> {
  size?: T
  disabled?: boolean
  status?: FormValidationStatus
}

export interface UseFormItem<T> {
  mergedSizeRef: ComputedRef<T>
  mergedDisabledRef: ComputedRef<boolean>
  mergedStatusRef: ComputedRef<FormValidationStatus | undefined>
  nTriggerFormBlur: () => void
  nTriggerFormChange: () => void
  nTriggerFormFocus: () => void
  nTriggerFormInput: () => void
}

export default function useFormItem<T extends AllowedSize = FormItemSize> (
  props: UseFormItemProps<T>,
  {
    defaultSize = 'medium',
    mergedSize,
    mergedDisabled
  }: UseFormItemOptions<T> = {}
): UseFormItem<T> {
  const NFormItem = inject(formItemInjectionKey, null)
  provide(formItemInjectionKey, null)
  const mergedSizeRef = computed(
    mergedSize
      ? () => mergedSize(NFormItem)
      : () => {
          const { size } = props as any
          if (size) return size
          if (NFormItem) {
            const { mergedSize } = NFormItem
            if (mergedSize.value !== undefined) {
              return mergedSize.value as T
            }
          }
          return defaultSize as T
        }
  )
  const mergedDisabledRef = computed(
    mergedDisabled
      ? () => mergedDisabled(NFormItem)
      : () => {
          const { disabled } = props
          if (disabled !== undefined) {
            return disabled
          }
          if (NFormItem) {
            return NFormItem.disabled.value
          }
          return false
        }
  )
  const mergedStatusRef = computed<FormValidationStatus | undefined>(() => {
    const { status } = props
    if (status) return status
    return NFormItem?.mergedValidationStatus.value
  })
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation()
    }
  })
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
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
