<markdown>
# Page slot

The pagination has a property `page-slot`, try it and you will understand. It aims to solving misclicks caused by the length changing of pagination.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
</script>

<template>
  <n-space vertical>
    <n-pagination v-model:page="page" :page-count="100" />
    <n-pagination v-model:page="page" :page-count="100" :page-slot="8" />
    <n-pagination v-model:page="page" :page-count="100" :page-slot="7" />
  </n-space>
</template>
