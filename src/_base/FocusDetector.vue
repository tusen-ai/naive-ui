<template>
  <div
    style="width: 0; height: 0;"
    tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  methods: {
    handleFocus () {
      this.$emit('focus')
    },
    handleBlur () {
      this.$emit('blur')
    }
  }
}
</script>
