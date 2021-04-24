import {
  inject,
  ref,
  toRef,
  ExtractPropTypes,
  PropType,
  Ref,
  ComputedRef,
  InjectionKey
} from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { useConfig, useFormItem } from '../../_mixins'
import { warn, call } from '../../_utils'
import type { MaybeArray } from '../../_utils'

const radioProps = {
  name: String,
  value: {
    type: [String, Number] as PropType<string | number>,
    default: 'on'
  },
  checked: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultChecked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  'onUpdate:checked': [Function, Array] as PropType<
  undefined | MaybeArray<(value: boolean) => void>
  >,
  // deprecated
  checkedValue: {
    type: Boolean as PropType<boolean | undefined>,
    validator: () => {
      warn(
        'radio',
        '`checked-value` is deprecated, please use `checked` instead.'
      )
      return true
    },
    default: undefined
  }
} as const

export interface RadioGroupInjection {
  mergedClsPrefixRef: Ref<string>
  nameRef: Ref<string | undefined>
  valueRef: Ref<string | number | null>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  disabledRef: Ref<boolean>
  doUpdateValue: (value: string | number) => void
}

export const radioGroupInjectionKey: InjectionKey<RadioGroupInjection> = Symbol(
  'radioGroup'
)

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
  handleKeyUp: (e: KeyboardEvent) => void
  handleMouseDown: () => void
  handleClick: () => void
}

function setup (props: ExtractPropTypes<typeof radioProps>): UseRadio {
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
    }
  })
  const inputRef = ref<HTMLElement | null>(null)
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
  const mergedDisabledRef = useMemo(() => {
    return NRadioGroup?.disabledRef.value || props.disabled
  })
  const focusRef = ref(false)
  function doUpdateChecked (): void {
    if (NRadioGroup) {
      const { doUpdateValue } = NRadioGroup
      const { value } = props
      doUpdateValue(value)
    } else {
      const { 'onUpdate:checked': updateChecked } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (updateChecked) call(updateChecked, true)
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
  }
  function handleRadioInputBlur (): void {
    focusRef.value = false
  }
  function handleRadioInputFocus (): void {
    focusRef.value = true
  }
  function handleKeyUp (e: KeyboardEvent): void {
    switch (e.code) {
      case 'Enter':
        inputRef.value?.click()
    }
  }
  function handleMouseDown (): void {
    if (mergedDisabledRef.value) return
    setTimeout(() => {
      if (!labelRef.value?.contains(document.activeElement)) {
        inputRef.value?.focus()
      }
    }, 0)
  }
  function handleClick (): void {
    inputRef.value?.click()
  }
  return {
    mergedClsPrefix: NRadioGroup
      ? NRadioGroup.mergedClsPrefixRef
      : useConfig(props).mergedClsPrefix,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: formItem.mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus,
    handleKeyUp,
    handleMouseDown,
    handleClick
  }
}

setup.props = radioProps

export type RadioProps = ExtractPropTypes<typeof radioProps>
export default setup
