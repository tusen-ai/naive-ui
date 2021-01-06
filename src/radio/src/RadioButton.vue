<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': mergedDisabled,
      'n-radio-button--checked': renderSafeChecked,
      'n-radio-button--focus': focus
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio-button__radio-input"
      :value="value"
      :name="mergedName"
      :checked="renderSafeChecked"
      :disabled="mergedDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div class="n-radio-button__state-border" />
    <slot />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { radioLight } from '../styles'
import useRadio from './use-radio'
import style from './styles/radio-button.cssr.js'

export default defineComponent({
  name: 'RadioButton',
  props: useRadio.props,
  setup (props) {
    useTheme('Radio', 'RadioButton', style, radioLight, props)
    return {
      cssVars: computed(() => {})
    }
  }
})
</script>
