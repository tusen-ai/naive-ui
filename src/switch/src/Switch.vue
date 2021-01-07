<template>
  <div
    class="n-switch"
    :class="{
      'n-switch--active': mergedValue,
      'n-switch--disabled': disabled,
      'n-switch--round': round
    }"
    :tabindex="!disabled ? 0 : false"
    :style="cssVars"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div class="n-switch__rail" />
  </div>
</template>

<script>
import { ref, toRef, defineComponent, computed } from 'vue'
import { depx, pxfy } from 'seemly'
import { useMergedState } from 'vooks'
import { useFormItem, useTheme } from '../../_mixins'
import { call, warn, createKey } from '../../_utils'
import style from './styles/index.cssr.js'
import { switchLight } from '../styles'

export default defineComponent({
  name: 'Switch',
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
    round: {
      type: Boolean,
      default: true
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
    const themeRef = useTheme('Switch', 'Switch', style, switchLight, props)
    const formItem = useFormItem(props)
    const { mergedSize: mergedSizeRef } = formItem
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    return {
      ...formItem,
      mergedValue: mergedValueRef,
      uncontrolledValue: uncontrolledValueRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          self: {
            opacityDisabled,
            railColor,
            railColorActive,
            buttonBoxShadow,
            buttonColor,
            [createKey('buttonHeight', size)]: buttonHeight,
            [createKey('buttonWidth', size)]: buttonWidth,
            [createKey('buttonWidthPressed', size)]: buttonWidthPressed,
            [createKey('railHeight', size)]: railHeight,
            [createKey('railWidth', size)]: railWidth,
            [createKey('railBorderRadius', size)]: railBorderRadius,
            [createKey('buttonBorderRadius', size)]: buttonBorderRadius
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        const offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2)
        const height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)))
        const width =
          depx(railHeight) > depx(buttonHeight)
            ? railWidth
            : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight))
        return {
          '--bezier': cubicBezierEaseInOut,
          '--button-border-radius': buttonBorderRadius,
          '--button-box-shadow': buttonBoxShadow,
          '--button-color': buttonColor,
          '--button-width': buttonWidth,
          '--button-width-pressed': buttonWidthPressed,
          '--button-height': buttonHeight,
          '--height': height,
          '--offset': offset,
          '--opacity-disabled': opacityDisabled,
          '--rail-border-radius': railBorderRadius,
          '--rail-color': railColor,
          '--rail-color-active': railColorActive,
          '--rail-height': railHeight,
          '--rail-width': railWidth,
          '--width': width
        }
      })
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
})
</script>
