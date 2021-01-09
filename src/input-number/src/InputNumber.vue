<template>
  <div class="n-input-number">
    <n-input
      ref="inputRef"
      v-model:value="displayedValue"
      passively-activated
      :unstable-theme="mergedTheme.peers.Input"
      :unstable-theme-overrides="mergedTheme.overrides.Input"
      :size="mergedSize"
      :placeholder="mergedPlaceholder"
      :disabled="disabled ? 'disabled' : false"
      :builtin-theme-overrides="inputThemeOverrides"
      :text-decoration="displayedValueInvalid ? 'line-through' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter="handleKeyDownEnter"
      @mousedown="handleMouseDown"
    >
      <template #suffix>
        <n-button
          text
          :disabled="!minusable || disabled"
          :focusable="false"
          :builtin-theme-overrides="buttonThemeOverrides"
          @mousedown.prevent
        >
          <n-base-icon>
            <remove-icon @click="handleMinusClick" />
          </n-base-icon>
        </n-button>
        <n-button
          text
          :disabled="!addable || disabled"
          :focusable="false"
          :builtin-theme-overrides="buttonThemeOverrides"
          @mousedown.prevent
        >
          <n-base-icon>
            <add-icon @click="handleAddClick" />
          </n-base-icon>
        </n-button>
      </template>
    </n-input>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, watch, computed } from 'vue'
import { rgba } from 'seemly'
import { useMemo, useMergedState } from 'vooks'
import { RemoveIcon, AddIcon } from '../../_base/icons'
import { NInput } from '../../input'
import { NBaseIcon } from '../../_base'
import { NButton } from '../../button'
import { useTheme, useFormItem, useLocale } from '../../_mixins'
import { warn, call } from '../../_utils'
import { inputNumberLight } from '../styles'
import { parse, validator, format } from './utils'

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
    doUpdateValue,
    deriveValueFromDisplayedValue,
    uncontrolledValueRef,
    mergedValueRef,
    addableRef,
    minusableRef,
    mergedMaxRef,
    mergedMinRef,
    inputRef,
    mergedStepRef,
    displayedValueRef
  }
) {
  const doFocus = (e) => {
    const { onFocus } = props
    const { nTriggerFormFocus } = formItem
    if (onFocus) call(onFocus, e)
    nTriggerFormFocus()
  }
  const doBlur = (e) => {
    const value = deriveValueFromDisplayedValue()
    // make sure e.target.value is correct in blur callback
    if (value !== false) e.target.value = value
    const { onBlur } = props
    const { nTriggerFormBlur } = formItem
    if (onBlur) call(onBlur, e)
    nTriggerFormBlur()
  }
  const doAdd = () => {
    const { value: addable } = addableRef
    if (!addable) return
    const { value: mergedValue } = mergedValueRef
    if (mergedValue === null) {
      doUpdateValue(createValidValue())
    } else {
      const { value: mergedStep } = mergedStepRef
      deriveValueFromDisplayedValue(mergedStep)
    }
  }
  const doMinus = () => {
    const { value: minusable } = minusableRef
    if (!minusable) return
    const { value: mergedValue } = mergedValueRef
    if (mergedValue === null) {
      doUpdateValue(createValidValue())
    } else {
      const { value: mergedStep } = mergedStepRef
      deriveValueFromDisplayedValue(-mergedStep)
    }
  }
  const handleFocus = (e) => doFocus(e)
  const handleBlur = (e) => doBlur(e)
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
    inputRef.value.activate()
  }
  const handleAddClick = () => doAdd()
  const handleMinusClick = () => doMinus()
  const handleKeyDownEnter = (e) => {
    if (e.target === inputRef.value.$el) {
      // hit input wrapper
      // which means not activated
      return
    }
    const value = deriveValueFromDisplayedValue()
    if (value !== false) {
      inputRef.value.deactivate()
    }
  }
  return {
    handleKeyDownEnter,
    handleMouseDown,
    handleAddClick,
    handleMinusClick,
    handleFocus,
    handleBlur
  }
}

export default defineComponent({
  name: 'InputNumber',
  components: {
    NBaseIcon,
    NInput,
    NButton,
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
    const themeRef = useTheme(
      'InputNumber',
      'InputNumber',
      null,
      inputNumberLight,
      props
    )
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
    const displayedValueRef = ref('')
    const mergedPlaceholderRef = useMemo(() => {
      const { placeholder } = props
      if (placeholder !== undefined) return placeholder
      return locale.placeholder
    })
    const mergedStepRef = useMemo(() => {
      const parsedNumber = parseNumber(props.step)
      if (parsedNumber !== null) {
        return parsedNumber === 0 ? 1 : Math.abs(parsedNumber)
      }
      return 1
    })
    const mergedMinRef = useMemo(() => {
      const parsedNumber = parseNumber(props.min)
      if (parsedNumber !== null) return parsedNumber
      else return null
    })
    const mergedMaxRef = useMemo(() => {
      const parsedNumber = parseNumber(props.max)
      if (parsedNumber !== null) return parsedNumber
      else return null
    })
    // import methods, can be created in useMethods
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
    const deriveValueFromDisplayedValue = (offset = 0, postUpdate = true) => {
      const { value: displayedValue } = displayedValueRef
      const parsedValue = parse(displayedValue)
      if (parsedValue === null) return null
      if (validator(parsedValue)) {
        let nextValue = parsedValue + offset
        if (validator(nextValue)) {
          const { value: mergedMax } = mergedMaxRef
          const { value: mergedMin } = mergedMinRef
          if (mergedMax !== null && nextValue > mergedMax) {
            if (!postUpdate) return false
            nextValue = mergedMax
          }
          if (mergedMin !== null && nextValue < mergedMin) {
            if (!postUpdate) return false
            nextValue = mergedMin
          }
          if (props.validator && !props.validator(nextValue)) return false
          if (postUpdate) doUpdateValue(nextValue)
          return nextValue
        }
      }
      return false
    }
    const deriveDisplayedValueFromValue = () => {
      const { value: mergedValue } = mergedValueRef
      if (validator(mergedValue)) {
        displayedValueRef.value = format(mergedValue)
      } else {
        displayedValueRef.value = mergedValue
      }
    }
    deriveDisplayedValueFromValue()
    const displayedValueInvalidRef = useMemo(() => {
      const derivedValue = deriveValueFromDisplayedValue(0, false)
      return derivedValue === false
    })
    const minusableRef = useMemo(() => {
      const { value: mergedValue } = mergedValueRef
      if (props.validator && mergedValue === null) {
        return false
      }
      const { value: mergedStep } = mergedStepRef
      const derivedNextValue = deriveValueFromDisplayedValue(-mergedStep, false)
      return derivedNextValue !== false
    })
    const addableRef = useMemo(() => {
      const { value: mergedValue } = mergedValueRef
      if (props.validator && mergedValue === null) {
        return false
      }
      const { value: mergedStep } = mergedStepRef
      const derivedNextValue = deriveValueFromDisplayedValue(+mergedStep, false)
      return derivedNextValue !== false
    })
    watch(mergedValueRef, () => {
      deriveDisplayedValueFromValue()
    })
    return {
      inputRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedPlaceholder: mergedPlaceholderRef,
      displayedValueInvalid: displayedValueInvalidRef,
      mergedSize: formItem.mergedSize,
      displayedValue: displayedValueRef,
      addable: addableRef,
      minusable: minusableRef,
      ...useMethods(props, formItem, {
        deriveValueFromDisplayedValue,
        doUpdateValue,
        uncontrolledValueRef,
        mergedValueRef,
        addableRef,
        minusableRef,
        mergedMaxRef,
        mergedMinRef,
        inputRef,
        mergedStepRef,
        displayedValueRef
      }),
      // theme
      mergedTheme: themeRef,
      inputThemeOverrides: {
        paddingRight: '8px'
      },
      buttonThemeOverrides: computed(() => {
        const {
          self: { iconColorDisabled }
        } = themeRef.value
        const [r, g, b, a] = rgba(iconColorDisabled)
        return {
          textColorTextDisabled: `rgb(${r}, ${g}, ${b})`,
          opacityDisabled: a
        }
      })
    }
  }
})
</script>
