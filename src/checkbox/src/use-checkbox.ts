import {
  inject,
  ref,
  toRef,
  ExtractPropTypes,
  PropType,
  Ref,
  ComputedRef,
  watchEffect
} from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { call, createInjectionKey, warnOnce } from '../../_utils'
import type { MaybeArray } from '../../_utils'

import { createId } from 'seemly'
import { useConfig, useFormItem } from '../../_mixins'

import type {
  OnUpdateChecked,
  OnUpdateCheckedImpl,
  CheckboxInst
} from './interface'

export const checkboxProps = {
  size: String as PropType<'small' | 'medium' | 'large'>,
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
  // private
  privateInsideTable: Boolean,
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

export const checkboxGroupInjectionKey =
  createInjectionKey<CheckboxGroupInjection>('n-checkbox-group')

function setup (props: ExtractPropTypes<typeof checkboxProps>): UseCheckbox {
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
  const selfRef = ref<HTMLDivElement | null>(null)
  const { mergedClsPrefixRef } = useConfig(props)
  const formItem = useFormItem(props, {
    mergedSize (NFormItem) {
      const { size } = props
      if (size !== undefined) return size
      if (NCheckboxGroup) {
        const { value: mergedSize } = NCheckboxGroup.mergedSizeRef
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (NFormItem) {
        const { mergedSize } = NFormItem
        if (mergedSize !== undefined) return mergedSize.value
      }
      return 'medium'
    },
    mergedDisabled (NFormItem) {
      const { disabled } = props
      if (disabled !== undefined) return disabled
      if (NCheckboxGroup) {
        if (NCheckboxGroup.disabledRef.value) return true
        const {
          maxRef: { value: max },
          checkedCountRef
        } = NCheckboxGroup
        if (
          max !== undefined &&
          checkedCountRef.value >= max &&
          !renderedCheckedRef.value
        ) {
          return true
        }
        const {
          minRef: { value: min }
        } = NCheckboxGroup
        if (
          min !== undefined &&
          checkedCountRef.value <= min &&
          renderedCheckedRef.value
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

  const { mergedSizeRef, mergedDisabledRef } = formItem
  const NCheckboxGroup = inject(checkboxGroupInjectionKey, null)
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
    } else {
      return mergedCheckedRef.value === props.checkedValue
    }
  })

  function toggle (e: MouseEvent | KeyboardEvent): void {
    if (NCheckboxGroup && props.value !== undefined) {
      NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value)
    } else {
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
      if (onChange) call(onChange as OnUpdateCheckedImpl, nextChecked, e) // deprecated
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = nextChecked
    }
  }
  function handleClick (e: MouseEvent): void {
    if (!mergedDisabledRef.value) {
      toggle(e)
    }
  }
  function handleKeyUp (e: KeyboardEvent): void {
    if (mergedDisabledRef.value) return
    switch (e.key) {
      case ' ':
      case 'Enter':
        toggle(e)
    }
  }
  function handleKeyDown (e: KeyboardEvent): void {
    switch (e.key) {
      case ' ':
        e.preventDefault()
    }
  }
  const exposedMethods: CheckboxInst = {
    focus: () => {
      selfRef.value?.focus()
    },
    blur: () => {
      selfRef.value?.blur()
    }
  }

  return Object.assign(formItem, exposedMethods, {
    selfRef,
    mergedClsPrefix: mergedClsPrefixRef,
    mergedDisabled: mergedDisabledRef,
    renderedChecked: renderedCheckedRef,
    mergedSize: mergedSizeRef,
    labelId: createId(),
    handleClick,
    handleKeyUp,
    handleKeyDown
  })
}

export interface UseCheckbox {
  selfRef: Ref<HTMLElement | null>
  mergedClsPrefix: Ref<string>
  mergedDisabled: Ref<boolean>
  renderedChecked: Ref<boolean>
  mergedSize: Ref<'small' | 'medium' | 'large'>
  labelId: string
  focus: () => void
  blur: () => void
  handleClick: (e: MouseEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void
  handleKeyDown: (e: KeyboardEvent) => void
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export { setup }
