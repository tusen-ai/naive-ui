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
  props: {
    onFocus: {
      type: Function,
      default: undefined
    },
    onBlur: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    handleFocus (e) {
      const { onFocus } = this
      if (onFocus) onFocus(e)
    },
    handleBlur (e) {
      const { onBlur } = this
      if (onBlur) onBlur(e)
    }
  }
}
</script>
