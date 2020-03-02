<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': syntheticDisabled,
      'n-radio-button--checked': syntheticChecked,
      'n-radio-button--focus': focus
    }"
    :style="{
      color: syntheticChecked ? syntheticAscendantBackgroundColor : null
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio-button__radio-input"
      :name="syntheticName"
      :checked="syntheticChecked"
      :disabled="syntheticDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div class="n-radio-button__border-mask" />
    <slot />
  </div>
</template>

<script>
import radioMixin from './radioMixin'

export default {
  name: 'NRadioButton',
  mixins: [ radioMixin ],
  created () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount++
  },
  beforeDestroy () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount--
  }
}
</script>
