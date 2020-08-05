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
  name: 'NLi',
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
