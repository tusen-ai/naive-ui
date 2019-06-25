<template>
  <div
    class="n-switch"
    @click="handleClick"
  >
    <div
      class="n-switch__rail"
      :class="{ 'n-switch__rail--active': active, 'n-switch__rail--disabled': disabled }"
    />
  </div>
</template>

<script>
export default {
  name: 'NSwitch',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: {
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
        this.$emit('change', !this.active)
      }
    }
  }
}
</script>
