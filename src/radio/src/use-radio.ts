import {
  inject,
  ref,
  toRef,
  type ExtractPropTypes,
  type PropType,
  type Ref,
  type ComputedRef,
  watchEffect,
  nextTick
} from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { useConfig, useFormItem } from '../../_mixins'
import { call, createInjectionKey, warnOnce } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { type OnUpdateValue, type OnUpdateValueImpl } from './interface'

export const radioBaseProps = {
  name: String,
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: 'on'
  },
  checked: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  label: String,
  size: String as PropType<'small' | 'medium' | 'large'>,
  onUpdateChecked: [Function, Array] as PropType<
  undefined | MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:checked': [Function, Array] as PropType<
  undefined | MaybeArray<(value: boolean) => void>
  >,
  // deprecated
  checkedValue: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export interface RadioGroupInjection {
  mergedClsPrefixRef: Ref<string>
  nameRef: Ref<string | undefined>
  valueRef: Ref<string | number | boolean | null>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  disabledRef: Ref<boolean>
  doUpdateValue: OnUpdateValue
}

export const radioGroupInjectionKey =
  createInjectionKey<RadioGroupInjection>('n-radio-group')

export interface UseRadio {
  mergedClsPrefix: Ref<string>
  inputRef: Ref<HTMLElement | null>
  labelRef: Ref<HTMLElement | null>
  mergedName: Ref<string | undefined>
  mergedDisabled: Ref<boolean>
  uncontrolledChecked: Ref<boolean>
  renderSafeChecked: Ref<boolean>
  focus: Ref<boolean>
  mergedSize: ComputedRef<'small' | 'medium' | 'large'>
  handleRadioInputChange: () => void
  handleRadioInputBlur: () => void
  handleRadioInputFocus: () => void
}

function setup (props: ExtractPropTypes<typeof radioBaseProps>): UseRadio {
  if (__DEV__) {
    watchEffect(() => {
      if (props.checkedValue !== undefined) {
        warnOnce(
          'radio',
          '`checked-value` is deprecated, please use `checked` instead.'
        )
      }
    })
  }
  const formItem = useFormItem(props, {
    mergedSize (NFormItem) {
      const { size } = props
      if (size !== undefined) return size
      if (NRadioGroup) {
        const {
          mergedSizeRef: { value: mergedSize }
        } = NRadioGroup
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (NFormItem) {
        return NFormItem.mergedSize.value
      }
      return 'medium'
    },
    mergedDisabled (NFormItem) {
      if (props.disabled) return true
      if (NRadioGroup?.disabledRef.value) return true
      if (NFormItem?.disabled.value) return true
      return false
    }
  })
  const { mergedSizeRef, mergedDisabledRef } = formItem
  const inputRef = ref<HTMLInputElement | null>(null)
  const labelRef = ref<HTMLElement | null>(null)
  const NRadioGroup = inject(radioGroupInjectionKey, null)
  const uncontrolledCheckedRef = ref(props.defaultChecked)
  const controlledCheckedRef = toRef(props, 'checked')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup) return NRadioGroup.valueRef.value === props.value
    return mergedCheckedRef.value
  })
  const mergedNameRef = useMemo(() => {
    const { name } = props
    if (name !== undefined) return name
    if (NRadioGroup) return NRadioGroup.nameRef.value
  })
  const focusRef = ref(false)
  function doUpdateChecked (): void {
    if (NRadioGroup) {
      const { doUpdateValue } = NRadioGroup
      const { value } = props
      call(doUpdateValue as OnUpdateValueImpl, value)
    } else {
      const { onUpdateChecked, 'onUpdate:checked': _onUpdateChecked } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateChecked) call(onUpdateChecked, true)
      if (_onUpdateChecked) call(_onUpdateChecked, true)
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = true
    }
  }
  function toggle (): void {
    if (mergedDisabledRef.value) return
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked()
    }
  }
  function handleRadioInputChange (): void {
    toggle()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.checked = mergedCheckedRef.value
      }
    })
  }
  function handleRadioInputBlur (): void {
    focusRef.value = false
  }
  function handleRadioInputFocus (): void {
    focusRef.value = true
  }
  return {
    mergedClsPrefix: NRadioGroup
      ? NRadioGroup.mergedClsPrefixRef
      : useConfig(props).mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  }
}

export type RadioBaseProps = ExtractPropTypes<typeof radioBaseProps>
export { setup }
