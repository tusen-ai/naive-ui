<template>
  <div
    class="n-checkbox"
    :class="{'n-checkbox--checked': isChecked, 'n-checkbox--disabled': disabled}"
    @click="handleClick"
  >
    <div
      class="n-checkbox__checkbox"
    />
    <div
      v-if="$slots.default"
      class="n-checkbox__label"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NCheckbox',
  model: {
    prop: 'isChecked',
    event: 'change'
  },
  props: {
    isChecked: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('change', !this.isChecked)
      }
    }
  }
}
</script>
