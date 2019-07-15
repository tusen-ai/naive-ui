<template>
  <div
    class="n-radio-button"
    :class="{
      'n-radio-button--disabled': disabled,
      'n-radio-button--checked': checked
    }"
    @click="handleClick"
  >
    <div class="n-radio-button__border-mask" />
    <div class="n-radio-button__label">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NRadioButton',
  model: {
    prop: 'privateValue',
    event: 'input'
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
    checked () {
      return this.privateValue === this.value
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return
      if (this.privateValue !== this.value) {
        this.$emit('input', this.value)
      }
    }
  }
}
</script>
