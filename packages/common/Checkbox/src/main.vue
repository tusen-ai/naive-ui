<template>
  <div
    class="n-checkbox"
    :class="{'n-checkbox--checked': value, 'n-checkbox--disabled': disabled, 'n-checkbox--indeterminate': indeterminate }"
  >
    <div
      class="n-checkbox__checkbox"
      @click="handleClick"
    />
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
export default {
  name: 'NCheckbox',
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
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
        this.$emit('change', !this.value, this.label)
      }
    }
  }
}
</script>
