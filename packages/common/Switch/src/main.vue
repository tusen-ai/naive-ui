<template>
  <div
    class="n-switch"
    @click="handleClick"
  >
    <div
      class="rail"
      :class="{ active: active }"
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
    }
  },
  methods: {
    handleClick () {
      this.$emit('change', !this.active)
    }
  }
}
</script>
