<template>
  <th class="n-table__th">
    <slot />
  </th>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Th'
})
</script>
