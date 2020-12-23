<template>
  <div
    class="n-switch"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-switch--${mergedSize}-size`]: true,
      'n-switch--active': mergedValue,
      'n-switch--disabled': disabled
    }"
    :tabindex="!disabled ? 0 : false"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div class="n-switch__rail" />
  </div>
</template>

<script>
import { ref, toRef } from 'vue'
import { useMergedState } from 'vooks'
import { configurable, themeable, useFormItem, withCssr } from '../../_mixins'
import { call, warn } from '../../_utils'
import styles from './styles'

export default {
  name: 'Switch',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    value: {
      type: Boolean,
      default: undefined
    },
    defaultValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'switch',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    return {
      mergedValue: mergedValueRef,
      uncontrolledValue: uncontrolledValueRef,
      ...useFormItem(props)
    }
  },
  methods: {
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
      this.uncontrolledValue = value
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doFocus (...args) {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus, ...args)
      nTriggerFormFocus()
    },
    doBlur (...args) {
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur, ...args)
      nTriggerFormBlur()
    },
    handleClick () {
      if (!this.disabled) {
        this.doUpdateValue(!this.mergedValue)
      }
    },
    handleFocus (e) {
      this.doFocus(e)
    },
    handleBlur (e) {
      this.doBlur(e)
    }
  }
}
</script>
