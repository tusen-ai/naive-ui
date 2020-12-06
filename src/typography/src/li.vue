<template>
  <li
    class="n-li"
    :class="{
      'n-li--align-text': alignText
    }"
  >
    <slot />
  </li>
</template>

<script>
export default {
  name: 'Li',
  cssrName: 'Typography',
  cssrId: 'TypographyList',
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
