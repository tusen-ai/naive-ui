<template>
  <div
    class="n-input-number"
    :class="[
      `n-input-number--${mergedSize}-size`,
      {
        'n-input-number--disabled': disabled,
        'n-input-number--invalid': invalid
      }
    ]"
  >
    <n-input
      :placeholder="mergedPlaceholder"
      :disabled="disabled ? 'disabled' : false"
      :value="stringifiedValue"
      :builtin-theme-overrides="inputThemeOverrides"
      @focus="doFocus"
      @blur="doBlur"
      @keyup.enter="handleEnter"
    >
      <template #prefix>
        <n-icon :configurable="false" @mousedown.prevent>
          <remove-icon @click="minus" />
        </n-icon>
      </template>
      <template #suffix>
        <n-icon :configurable="false" @mousedown.prevent>
          <add-icon @click="add" />
        </n-icon>
      </template>
    </n-input>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, computed } from 'vue'
import { useMergedState } from 'vooks'
import { NInput } from '../../input'
import { NIcon } from '../../icon'
import { RemoveIcon, AddIcon } from '../../_base/icons'
import { useTheme, useFormItem, useLocale } from '../../_mixins'
import { warn, call } from '../../_utils'
// import { inputNumberLight } from '../styles'
// import style from './styles/index.cssr.js'

function parseNumber (number) {
  if (number === null) return null
  if (typeof number === 'number') {
    return number
  } else {
    const parsedNumber = Number(number)
    if (Number.isNaN(parsedNumber)) return null
    else {
      return parsedNumber
    }
  }
}

function useMethods (
  props,
  formItem,
  {
    uncontrolledValueRef,
    mergedValueRef,
    addableRef,
    minusableRef,
    mergedMaxRef,
    mergedMinRef,
    inputRef,
    mergedStepRef
  }
) {
  const doUpdateValue = (value) => {
    const { value: mergedValue } = mergedValueRef
    if (value === mergedValue) return
    const { 'onUpdate:value': onUpdateValue, onChange } = props
    const { nTriggerFormInput, nTriggerFormChange } = formItem
    if (onChange) call(onChange, value)
    if (onUpdateValue) call(onUpdateValue, value)
    uncontrolledValueRef.value = value
    nTriggerFormInput()
    nTriggerFormChange()
  }
  const doFocus = (e) => {
    const { onFocus } = props
    const { nTriggerFormFocus } = formItem
    if (onFocus) call(onFocus, e)
    nTriggerFormFocus()
  }
  const doBlur = (e) => {
    const value = sanitizeValue(e.target.value)
    e.target.value = value
    doUpdateValue(value)
    const { onBlur } = props
    const { nTriggerFormBlur } = formItem
    if (onBlur) call(onBlur, e)
    nTriggerFormBlur()
  }
  const createValidValue = () => {
    if (props.validator) return null
    const { value: mergedMin } = mergedMinRef
    const { value: mergedMax } = mergedMaxRef
    if (mergedMin !== null) {
      return Math.max(0, mergedMin)
    } else if (mergedMax !== null) {
      return Math.min(0, mergedMax)
    } else {
      return 0
    }
  }
  const handleMouseDown = (e) => {
    if (document.activeElement !== inputRef.value) {
      inputRef.value.focus()
    }
    e.preventDefault()
  }
  const add = () => {
    const { value: addable } = addableRef
    if (!addable) return
    const { value: mergedValue } = mergedValueRef
    if (mergedValue === null) {
      doUpdateValue(createValidValue())
    } else {
      const { value: mergedStep } = mergedStepRef
      const valueAfterChange = sanitizeValue(mergedValue + mergedStep)
      doUpdateValue(valueAfterChange)
    }
  }
  const minus = () => {
    const { value: minusable } = minusableRef
    if (!minusable) return
    const { value: mergedValue } = mergedValueRef
    if (mergedValue === null) {
      doUpdateValue(createValidValue())
    } else {
      const { value: mergedStep } = mergedStepRef
      const valueAfterChange = sanitizeValue(mergedValue - mergedStep)
      doUpdateValue(valueAfterChange)
    }
  }
  const handleEnter = (e) => {
    const value = sanitizeValue(inputRef.value.value)
    inputRef.value.value = value
    doUpdateValue(value)
  }
  const sanitizeValue = (value) => {
    value = String(value).trim() || ''
    if (value.trim() === '') {
      value = null
    } else if (Number.isNaN(Number(value))) {
      value = this.mergedValue
    } else {
      value = Number(value)
    }
    if (value === null) {
      return null
    }
    const { validator } = props
    if (validator) {
      if (validator(value)) {
        return value
      } else {
        return null
      }
    } else {
      const { value: mergedMin } = mergedMinRef
      const { value: mergedMax } = mergedMaxRef
      if (mergedMin !== null && value < mergedMin) {
        value = mergedMin
      } else if (mergedMax !== null && value > mergedMax) {
        value = mergedMax
      }
    }
    return value
  }
  return {
    handleEnter,
    handleMouseDown,
    add,
    minus,
    doFocus,
    doBlur
  }
}

export default defineComponent({
  name: 'InputNumber',
  components: {
    NIcon,
    NInput,
    RemoveIcon,
    AddIcon
  },
  props: {
    ...useTheme.props,
    placeholder: {
      type: String,
      default: undefined
    },
    defaultValue: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: undefined
    },
    step: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: [Number, String],
      default: undefined
    },
    max: {
      type: [Number, String],
      default: undefined
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validator: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'input-number',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    // const themeRef = useTheme('InputNumber', 'InputNumber', style, inputNumberLight, props)
    const { locale } = useLocale('InputNumber')
    const formItem = useFormItem(props)
    // dom ref
    const inputRef = ref(null)
    // value
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const mergedPlaceholderRef = computed(() => {
      const { placeholder } = props
      if (placeholder !== undefined) return placeholder
      return locale.placeholder
    })
    const mergedStepRef = computed(() => {
      const parsedNumber = parseNumber(props.step)
      if (parsedNumber !== null) {
        return parsedNumber === 0 ? 1 : Math.abs(parsedNumber)
      }
      return 1
    })
    const mergedMinRef = computed(() => {
      const parsedNumber = parseNumber(props.min)
      if (parsedNumber !== null) return parsedNumber
      else return null
    })
    const mergedMaxRef = computed(() => {
      const parsedNumber = parseNumber(props.max)
      if (parsedNumber !== null) return parsedNumber
      else return null
    })
    const invalidRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (mergedValue === null) return false
      const { validator } = props
      if (validator && !validator(mergedValue)) return true
      const { value: mergedMin } = mergedMinRef
      if (mergedMin !== null && mergedValue < mergedMin) return true
      const { value: mergedMax } = mergedMaxRef
      if (mergedMax !== null && mergedValue > mergedMax) return true
      return false
    })
    const minusableRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      const { value: mergedMin } = mergedMinRef
      const { validator } = props
      if (validator) {
        if (mergedValue !== null) return validator(mergedValue - props.step)
        else return false
      } else {
        return !(
          mergedValue !== null &&
          mergedMin !== null &&
          mergedValue <= mergedMin
        )
      }
    })
    const addableRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      const { value: mergedMax } = mergedMaxRef
      const { validator } = props
      if (validator) {
        if (mergedValue !== null) return validator(mergedValue + props.step)
        else return false
      } else {
        return !(
          mergedValue !== null &&
          mergedMax !== null &&
          mergedValue >= mergedMax
        )
      }
    })
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedPlaceholder: mergedPlaceholderRef,
      invalid: invalidRef,
      stringifiedValue: computed(() => {
        const { value } = mergedValueRef
        return value === undefined || value === null ? value : String(value)
      }),
      mergedSize: formItem.mergedSize,
      ...useMethods(props, formItem, {
        uncontrolledValueRef,
        mergedValueRef,
        addableRef,
        minusableRef,
        mergedMaxRef,
        mergedMinRef,
        inputRef,
        mergedStepRef
      }),
      cssVars () {
        // const {
        //   common {
        //   },
        //   self {
        //   }
        // } = themeRef.value
        // return {
        // }
      },
      inputThemeOverrides: {
        paddingLeft: '8px',
        paddingRight: '8px'
      }
    }
  }
})
</script>
