<template>
  <tbody class="n-table__tbody">
    <slot />
  </tbody>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tbody'
})
</script>
