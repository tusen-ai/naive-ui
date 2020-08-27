<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': syntheticDisabled,
      'n-radio--checked': syntheticChecked,
      'n-radio--focus': focus,
      [`n-radio--${syntheticSize}-size`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
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
      class="n-radio__dot"
      :class="{
        'n-radio__dot--checked': syntheticChecked
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
import radioMixin from './radio-mixin'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/radio/index.js'

export default {
  name: 'Radio',
  mixins: [
    withapp,
    themeable,
    usecssr(styles),
    asformitem(
      {
        change: 'change',
        blur: 'blur',
        focus: 'focus'
      },
      'medium',
      function () {
        const size = this.size
        if (size) return size
        const NRadioGroup = this.NRadioGroup
        if (NRadioGroup && NRadioGroup.syntheticSize) {
          return NRadioGroup.syntheticSize
        }
        const NFormItem = this.NFormItem
        if (
          NFormItem &&
        NFormItem !== '__FORM_ITEM_INNER__' &&
        NFormItem.syntheticSize
        ) {
          return NFormItem.syntheticSize
        }
        return 'medium'
      }
    ),
    radioMixin
  ],
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
    }
  },
  computed: {
    syntheticTheme () {
      const theme = this.theme
      const NRadioGroup = this.NRadioGroup
      if (theme !== null) {
        return theme
      } else if (NRadioGroup && NRadioGroup.syntheticTheme) {
        return NRadioGroup.syntheticTheme
      } else {
        const NConfigProvider = this.NConfigProvider
        return (NConfigProvider && NConfigProvider.syntheticTheme) || null
      }
    }
  }
}
</script>
