<template>
  <thead class="n-table__thead">
    <slot />
  </thead>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Thead'
})
</script>
