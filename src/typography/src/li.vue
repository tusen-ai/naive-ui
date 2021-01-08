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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Li',
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
})
</script>
