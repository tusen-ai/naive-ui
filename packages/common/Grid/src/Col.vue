<template>
  <div
    class="n-col"
    :class="{
      [`n-col--${span}-span`]: true
    }"
    :style="{
      paddingLeft: gutter / 2 + 'px',
      paddingRight: gutter / 2 + 'px'
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  inject: {
    NRow: {
      gutter: 0
    }
  },
  name: 'NCol',
  props: {
    span: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    gutter () {
      return this.NRow.gutter
    }
  }
}
</script>

<style>
.n-row {
  width: 100%;
}
</style>
