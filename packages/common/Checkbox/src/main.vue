<template>
  <div
    class="n-checkbox"

    :class="{'n-checkbox--checked': value, 'n-checkbox--disabled': disabled, 'n-checkbox--indeterminate': indeterminate,[`n-${synthesizedTheme}-theme`]: synthesizedTheme, }"
  >
    <div
      class="n-checkbox-box"
      @click="handleClick"
    >
      <check-mark class="n-checkbox-box__check-mark" />
      <line-mark class="n-checkbox-box__line-mark" />
    </div>
    <div
      v-if="$slots.default"
      class="n-checkbox__label"
      @click="handleClick"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import CheckMark from './CheckMark'
import LineMark from './LineMark'

export default {
  name: 'NCheckbox',
  components: {
    CheckMark,
    LineMark
  },
  mixins: [
    withapp,
    themeable
  ],
  props: {
    label: {
      type: [Number, Boolean, String],
      default: null
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
      if (!this.disabled) {
        this.$emit('input', !this.value)
        this.$emit('change', !this.value, this.label)
      }
    }
  }
}
</script>
