<template>
  <div
    class="n-switch"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :tabindex="!disabled ? 0 : false"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div
      class="n-switch__rail"
      :class="{
        'n-switch__rail--active': value,
        'n-switch__rail--disabled': disabled
      }"
    />
  </div>
</template>

<script>
import {
  configurable,
  themeable,
  asFormItem,
  withCssr
} from '../../_mixins'
import {
  call,
  warn
} from '../../_utils'
import styles from './styles'

export default {
  cssrName: 'Switch',
  mixins: [
    configurable,
    themeable,
    asFormItem(),
    withCssr(styles)
  ],
  props: {
    value: {
      type: Boolean,
      required: true
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
        if (__DEV__) warn('switch', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  methods: {
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doFocus (...args) {
      const {
        onFocus,
        nTriggerFormFocus
      } = this
      if (onFocus) call(onFocus, ...args)
      nTriggerFormFocus()
    },
    doBlur (...args) {
      const {
        onBlur,
        nTriggerFormBlur
      } = this
      if (onBlur) call(onBlur, ...args)
      nTriggerFormBlur()
    },
    handleClick () {
      if (!this.disabled) {
        this.doUpdateValue(!this.value)
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
