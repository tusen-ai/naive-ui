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
      ref="inputRef"
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
    <span ref="labelRef">
      <slot />
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useRadio from './use-radio'

export default defineComponent({
  name: 'RadioButton',
  props: useRadio.props,
  setup (props) {
    return useRadio(props)
  }
})
</script>
