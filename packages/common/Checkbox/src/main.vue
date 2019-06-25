<template>
  <div
    class="n-checkbox"
    @click="handleClick"
  >
    <div
      class="n-checkbox__checkbox"
      :class="{'is-checked':checked, 'n-checkbox__checkbox--disabled': disabled}"
    >
      <div
        class="n-checkbox-checkbox__inner"
        :class="{'is-checked':checked}"
      />
    </div>
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
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
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
        this.$emit('change', !this.checked)
      }
    }
  }
}
</script>
