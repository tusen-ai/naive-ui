import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import type { MaybeArray } from '../../_utils'
import type { OnUpdateChecked, OnUpdateCheckedImpl } from './interface'
import type { CheckboxSize } from './public-types'
import { createId } from 'seemly'
import { useMemo, useMergedState } from 'vooks'
import { inject, ref, toRef, watchEffect } from 'vue'
import { useConfig, useFormItem } from '../../_mixins'
import { call, createInjectionKey, warnOnce } from '../../_utils'

export const checkboxBaseProps = {
  size: String as PropType<CheckboxSize>,
  checked: {
    type: [Boolean, String, Number] as PropType<
      boolean | string | number | undefined
    >,
    default: undefined
  },
  defaultChecked: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  value: [String, Number] as PropType<string | number>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  'onUpdate:checked': [Function, Array] as PropType<
    MaybeArray<OnUpdateChecked>
  >,
  onUpdateChecked: [Function, Array] as PropType<MaybeArray<OnUpdateChecked>>,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateChecked>>
}

export interface CheckboxGroupInjection {
  checkedCountRef: ComputedRef<number>
  maxRef: Ref<number | undefined>
  minRef: Ref<number | undefined>
  disabledRef: Ref<boolean>
  valueSetRef: Ref<Set<string | number>>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void
}

export const checkboxGroupInjectionKey
  = createInjectionKey<CheckboxGroupInjection>('n-checkbox-group')

export interface UseCheckbox {
  mergedClsPrefix: Ref<string>
  selfRef: Ref<HTMLDivElement | null>
  mergedDisabled: Ref<boolean>
  renderedChecked: Ref<boolean>
  mergedSize: ComputedRef<CheckboxSize>
  handleClick: (e: MouseEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void
  handleKeyDown: (e: KeyboardEvent) => void
  focus: Ref<boolean>
  blur: () => void
  labelId: string
}

function setup(props: ExtractPropTypes<typeof checkboxBaseProps>): UseCheckbox {
  if (__DEV__) {
    watchEffect(() => {
      if (props.onChange) {
        warnOnce(
          'checkbox',
          '`on-change` is deprecated, please use `on-update:checked` instead.'
        )
      }
    })
  }
  const NCheckboxGroup = inject(checkboxGroupInjectionKey, null)
  const selfRef = ref<HTMLDivElement | null>(null)
  const focusRef = ref(false)
  const { mergedClsPrefixRef, mergedComponentPropsRef } = useConfig(props)
  const uncontrolledCheckedRef = ref(props.defaultChecked)
  const controlledCheckedRef = toRef(props, 'checked')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  const renderedCheckedRef = useMemo(() => {
    if (NCheckboxGroup) {
      const groupValueSet = NCheckboxGroup.valueSetRef.value
      if (groupValueSet && props.value !== undefined) {
        return groupValueSet.has(props.value)
      }
      return false
    }
    else {
      return mergedCheckedRef.value === props.checkedValue
    }
  })
  const formItem = useFormItem(props, {
    mergedSize(NFormItem) {
      const { size } = props
      if (size !== undefined)
        return size
      if (NCheckboxGroup) {
        const { value: mergedSize } = NCheckboxGroup.mergedSizeRef
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (NFormItem) {
        const { mergedSize } = NFormItem
        if (mergedSize !== undefined)
          return mergedSize.value
      }
      const configSize = mergedComponentPropsRef?.value?.Checkbox?.size
      if (configSize)
        return configSize
      return 'medium'
    },
    mergedDisabled(NFormItem) {
      const { disabled } = props
      if (disabled !== undefined)
        return disabled
      if (NCheckboxGroup) {
        if (NCheckboxGroup.disabledRef.value)
          return true
        const {
          maxRef: { value: max },
          checkedCountRef
        } = NCheckboxGroup
        if (
          max !== undefined
          && checkedCountRef.value >= max
          && !renderedCheckedRef.value
        ) {
          return true
        }
        const {
          minRef: { value: min }
        } = NCheckboxGroup
        if (
          min !== undefined
          && checkedCountRef.value <= min
          && renderedCheckedRef.value
        ) {
          return true
        }
      }
      if (NFormItem) {
        return NFormItem.disabled.value
      }
      return false
    }
  })
  const { mergedDisabledRef, mergedSizeRef } = formItem
  function toggle(e: MouseEvent | KeyboardEvent): void {
    if (NCheckboxGroup && props.value !== undefined) {
      NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value)
    }
    else {
      const {
        onChange,
        'onUpdate:checked': _onUpdateCheck,
        onUpdateChecked
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const nextChecked = renderedCheckedRef.value
        ? props.uncheckedValue
        : props.checkedValue
      if (_onUpdateCheck) {
        call(_onUpdateCheck as OnUpdateCheckedImpl, nextChecked, e)
      }
      if (onUpdateChecked) {
        call(onUpdateChecked as OnUpdateCheckedImpl, nextChecked, e)
      }
      if (onChange)
        call(onChange as OnUpdateCheckedImpl, nextChecked, e)
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = nextChecked
    }
  }
  function handleClick(e: MouseEvent): void {
    if (!mergedDisabledRef.value) {
      e.preventDefault()
      toggle(e)
    }
  }
  function handleKeyUp(e: KeyboardEvent): void {
    if (mergedDisabledRef.value)
      return
    switch (e.key) {
      case ' ':
      case 'Enter':
        toggle(e)
    }
  }
  function handleKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case ' ':
        e.preventDefault()
    }
  }
  const labelId = createId()
  return {
    mergedClsPrefix: mergedClsPrefixRef,
    selfRef,
    mergedDisabled: mergedDisabledRef,
    renderedChecked: renderedCheckedRef,
    mergedSize: mergedSizeRef,
    handleClick,
    handleKeyUp,
    handleKeyDown,
    focus: focusRef,
    blur: () => {
      selfRef.value?.blur()
    },
    labelId
  }
}

export type CheckboxBaseProps = ExtractPropTypes<typeof checkboxBaseProps>
export { setup }
