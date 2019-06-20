<template>
  <div
    class="n-checkbox"
    @click="handleClick"
  >
    <div
      class="n-checkbox__checkbox"
      :class="{'is-checked':checked}"
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
    checked: Boolean
  },
  methods: {
    handleClick () {
      this.$emit('change', !this.checked)
    }
  }
}
</script>
