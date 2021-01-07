<template>
  <tr class="n-table__tr">
    <slot />
  </tr>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tr'
})
</script>
