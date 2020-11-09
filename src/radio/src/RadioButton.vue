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
    <div class="n-radio-button__border-mask" />
    <slot />
  </div>
</template>

<script>
import radioMixin from './radio-mixin'
import setup from './radio-setup'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/radio-button/index.js'

export default {
  name: 'RadioButton',
  cssrName: 'Radio',
  cssrId: 'RadioButton',
  mixins: [
    configurable,
    themeable,
    radioMixin,
    withCssr(styles)
  ],
  setup
}
</script>
