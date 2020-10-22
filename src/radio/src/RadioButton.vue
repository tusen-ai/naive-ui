<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': mergedDisabled,
      'n-radio-button--checked': renderSafeChecked,
      'n-radio-button--focus': focus
    }"
    :style="{
      color: renderSafeChecked ? syntheticAscendantBackgroundColor : null
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio-button__radio-input"
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
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/radio-button/index.js'

export default {
  name: 'RadioButton',
  cssrName: 'Radio',
  cssrId: 'RadioButton',
  mixins: [
    withapp,
    themeable,
    radioMixin,
    usecssr(styles)
  ],
  setup
}
</script>
