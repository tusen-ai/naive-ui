<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': disabled,
      'n-radio-button--checked': checked
    }"
    :tabindex="disabled ? -1 : 0"
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
    prop: 'privateValue',
    event: 'input'
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
    privateValue: {
      type: [Boolean, String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // shouldSimulateHollowOutText () {
    //   return this.checked && (this.NRadioGroup.synthesizedTheme === 'dark')
    // },
    checked () {
      if (this.NRadioGroup) {
        return this.NRadioGroup.value === this.value
      } else {
        return this.privateValue === this.value
      }
    }
  },
  methods: {
    handleKeyUpEnter () {
      this.toggle()
    },
    handleClick () {
      this.toggle()
    },
    toggle () {
      if (this.disabled) return
      if (this.privateValue !== this.value) {
        this.emitValue(this.value)
      }
    },
    emitValue () {
      if (this.NRadioGroup) {
        this.NRadioGroup.$emit('input', this.value)
      } else {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
