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
  asformitem,
  usecssr
} from '../../_mixins'
import {
  call
} from '../../_utils/vue'
import {
  warn
} from '../../_utils/naive'
import styles from './styles'

export default {
  cssrName: 'Switch',
  mixins: [
    configurable,
    themeable,
    asformitem(),
    usecssr(styles)
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
        __triggerFormInput,
        __triggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      __triggerFormInput()
      __triggerFormChange()
    },
    doFocus (...args) {
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) call(onFocus, ...args)
      __triggerFormFocus()
    },
    doBlur (...args) {
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) call(onBlur, ...args)
      __triggerFormBlur()
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
