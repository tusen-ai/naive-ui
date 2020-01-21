<template>
  <div class="n-base-select-group-header">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'NBaseSelectGroupHeader',
  props: {
    name: {
      type: String,
      default: null
    }
  }
}
</script>
