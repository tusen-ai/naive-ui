<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': mergedDisabled,
      'n-radio--checked': renderSafeChecked,
      'n-radio--focus': focus,
      [`n-radio--${mergedSize}-size`]: true,
      [`n-${renderedTheme}-theme`]: renderedTheme
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio__radio-input"
      :value="value"
      :name="mergedName"
      :checked="renderSafeChecked"
      :disabled="mergedDisabled"
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
    <div v-if="$slots.default" class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import { configurable, themeable, asFormItem, withCssr } from '../../_mixins'
import radioMixin from './radio-mixin'
import styles from './styles/radio/index.js'
import setup from './radio-setup'

export default {
  name: 'Radio',
  mixins: [
    configurable,
    themeable,
    withCssr(styles),
    asFormItem({
      mergedSize () {
        const { size } = this
        if (size !== undefined) return size
        const { NRadioGroup } = this
        if (NRadioGroup && NRadioGroup.mergedSize) {
          return NRadioGroup.mergedSize
        }
        const { NFormItem } = this
        if (NFormItem && NFormItem.mergedSize) {
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
    renderedTheme () {
      const { theme, NRadioGroup } = this
      if (theme !== undefined) {
        return theme
      } else if (NRadioGroup && NRadioGroup.mergedTheme) {
        return NRadioGroup.mergedTheme
      } else {
        const { NConfigProvider } = this
        return (NConfigProvider && NConfigProvider.mergedTheme) || undefined
      }
    }
  }
}
</script>
