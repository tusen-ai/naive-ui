<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': synthesizedDisabled,
      'n-radio-button--checked': synthesizedChecked
    }"
    :tabindex="synthesizedDisabled ? -1 : 0"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
  >
    <div class="n-radio-button__border-mask" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NRadioButton',
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
      default: null
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
  created () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount++
  },
  beforeDestroy () {
    this.NRadioGroup && this.NRadioGroup.radioButtonCount--
  },
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick () {
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
