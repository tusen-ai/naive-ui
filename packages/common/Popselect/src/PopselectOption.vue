<template>
  <div class="n-popselect-option">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'NPopselectOption',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      validator () {
        return true
      },
      required: true
    }
  }
}
</script>
