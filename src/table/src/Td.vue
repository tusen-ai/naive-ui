<template>
  <td class="n-table__td">
    <slot />
  </td>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Td'
})
</script>
