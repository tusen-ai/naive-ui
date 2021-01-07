import { inject, ref, toRef } from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { useFormItem } from '../../_mixins'
import { warn, call } from '../../_utils'

function setup (props) {
  const formItem = useFormItem(props, {
    mergedSize (NFormItem) {
      const { size } = props
      if (size !== undefined) return size
      if (NRadioGroup) {
        const { mergedSize } = NRadioGroup
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (NFormItem) {
        const { mergedSize } = NFormItem
        return mergedSize
      }
      return 'medium'
    }
  })
  const inputRef = ref(null)
  const labelRef = ref(null)
  const NRadioGroup = inject('NRadioGroup', null)
  const uncontrolledCheckedRef = ref(props.defaultChecked)
  const controlledCheckedRef = toRef(props, 'checked')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup) return NRadioGroup.value === props.value
    return mergedCheckedRef.value
  })
  const mergedNameRef = useMemo(() => {
    const { name } = props
    if (name !== undefined) return name
    if (NRadioGroup) return NRadioGroup.name
  })
  const mergedDisabledRef = useMemo(() => {
    return (NRadioGroup && NRadioGroup.disabled) || props.disabled
  })
  const focusRef = ref(false)
  function doUpdateChecked () {
    if (NRadioGroup) {
      const {
        'onUpdate:value': updateValue,
        nTriggerFormInput,
        nTriggerFormChange
      } = NRadioGroup
      const { value } = props
      if (updateValue) call(updateValue, value)
      nTriggerFormInput()
      nTriggerFormChange()
    } else {
      const { 'onUpdate:checked': updateChecked } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (updateChecked) call(updateChecked, true)
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = true
    }
  }
  function toggle () {
    if (mergedDisabledRef.value) return
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked()
    }
  }
  function handleRadioInputChange () {
    toggle()
  }
  function handleRadioInputBlur () {
    focusRef.value = false
  }
  function handleRadioInputFocus () {
    focusRef.value = true
  }
  function handleKeyUpEnter () {
    inputRef.value.click()
  }
  function handleMouseDown () {
    if (mergedDisabledRef.value) return
    setTimeout(() => {
      if (!labelRef.value.contains(document.activeElement)) {
        inputRef.value.focus()
      }
    }, 0)
  }
  function handleClick (e) {
    const { onClick } = props
    if (onClick) onClick(e)
    inputRef.value.click()
  }
  return {
    inputRef,
    labelRef,
    NRadioGroup,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus,
    handleKeyUpEnter,
    handleMouseDown,
    handleClick,
    ...formItem
  }
}

setup.props = {
  name: {
    type: String,
    default: undefined
  },
  value: {
    type: [Boolean, String, Number],
    default: null
  },
  checked: {
    type: Boolean,
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
  size: {
    validator (value) {
      return ['small', 'medium', 'large'].includes(value)
    },
    default: undefined
  },
  onClick: {
    type: Function,
    default: undefined
  },
  'onUpdate:checked': {
    type: [Function, Array],
    default: undefined
  },
  // deprecated
  checkedValue: {
    validator () {
      warn(
        'radio',
        '`checked-value` is deprecated, please use `checked` instead.'
      )
      return true
    },
    default: undefined
  }
}

export default setup
