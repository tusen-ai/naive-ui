<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': synthesizedDisabled,
      'n-radio--checked': synthesizedChecked,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="synthesizedDisabled ? -1 : 0"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
  >
    <div
      class="n-radio__control"
      :class="{
        'n-radio__control--checked': synthesizedChecked
      }"
    />
    <div class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import asformitem from '../../../mixins/asformitem'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NRadio',
  mixins: [ withapp, themeable, asformitem() ],
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  inject: {
    NRadioGroup: {
      default: null
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    synthesizedChecked () {
      if (this.NRadioGroup) {
        return this.NRadioGroup.value === this.value
      } else {
        return this.checkedValue === this.value
      }
    },
    synthesizedDisabled () {
      if (this.NRadioGroup && this.NRadioGroup.disabled) return true
      if (this.disabled) return true
      return false
    }
  },
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick (e) {
      this.$emit('click', e)
      this.toggle()
    },
    toggle () {
      if (this.synthesizedDisabled) return
      if (this.checkedValue !== this.value) {
        this.emitChangeEvent()
      }
    },
    emitChangeEvent () {
      if (this.NRadioGroup) {
        this.NRadioGroup.$emit('change', this.value)
      } else {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>
