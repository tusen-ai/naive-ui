<markdown>
# Size
</markdown>

<template>
  <n-spce vertical>
    <n-pagination v-model:page="page" :page-count="100" :size="'small'" />
    <n-pagination v-model:page="page" :page-count="100" :size="'medium'" />
    <n-pagination v-model:page="page" :page-count="100" :size="'large'" />
  </n-spce>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2)
    }
  }
})
</script>
