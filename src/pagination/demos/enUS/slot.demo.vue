<markdown>
# Page slot

The pagination has a property `page-slot`, try it and you will understand. It aims to solving misclicks caused by the length changing of pagination.
</markdown>

<template>
  <n-space vertical>
    <n-pagination v-model:page="page" :page-count="100" />
    <n-pagination v-model:page="page" :page-count="100" :page-slot="8" />
    <n-pagination v-model:page="page" :page-count="100" :page-slot="7" />
  </n-space>
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
