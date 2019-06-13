<template>
  <div
    class="n-checkbox"
    @click="handleClick"
  >
    <div
      class="checkbox"
      :class="{checked:checked}"
    >
      <div
        class="inner"
        :class="{checked:checked}"
      />
    </div>
    <div class="label">
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
    checked: Boolean
  },
  methods: {
    handleClick () {
      this.$emit('change', !this.checked)
    }
  }
}
</script>
