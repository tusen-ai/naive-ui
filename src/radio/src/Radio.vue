<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': syntheticDisabled,
      'n-radio--checked': renderSafeChecked,
      'n-radio--focus': focus,
      [`n-radio--${mergedSize}-size`]: true,
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
      :checked="renderSafeChecked"
      :disabled="syntheticDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div
      class="n-radio__dot"
      :class="{
        'n-radio__dot--checked': renderSafeChecked
      }"
    />
    <div
      v-if="$slots.default"
      class="n-radio__label"
    >
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
import setup from './radio-setup'

export default {
  name: 'Radio',
  mixins: [
    withapp,
    themeable,
    usecssr(styles),
    asformitem({
      mergedSize () {
        const { size } = this
        if (size !== undefined) return size
        const { NRadioGroup } = this
        if (NRadioGroup && NRadioGroup.mergedSize) {
          return NRadioGroup.mergedSize
        }
        const { NFormItem } = this
        if (
          NFormItem &&
          NFormItem.mergedSize
        ) {
          return NFormItem.mergedSize
        }
        return 'medium'
      }
    }),
    radioMixin
  ],
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    }
  },
  setup,
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
