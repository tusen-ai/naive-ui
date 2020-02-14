<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': syntheticDisabled,
      'n-radio--checked': syntheticChecked,
      'n-radio--focus': focus,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio__radio-input"
      :name="syntheticName"
      :checked="syntheticChecked"
      :disabled="syntheticDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div
      class="n-radio__control"
      :class="{
        'n-radio__control--checked': syntheticChecked
      }"
    />
    <div class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import asformitem from '../../_mixins/asformitem'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import radioMixin from './radioMixin'

export default {
  name: 'NRadio',
  mixins: [ withapp, themeable, asformitem(), radioMixin ]
}
</script>
