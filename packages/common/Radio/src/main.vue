<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': disabled,
      'n-radio--checked': checked
    }"
    @click="handleClick"
  >
    <div
      class="n-radio__control"
      :class="{
        'n-radio__control--checked': checked
      }"
    />
    <div class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NRadio',
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
      if (this.privateValue !== this.value) {
        this.$emit('input', this.value)
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
