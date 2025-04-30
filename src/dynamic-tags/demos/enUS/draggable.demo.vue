<markdown>
# draggable
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September'
])
</script>

<template>
  <n-space>
    <n-dynamic-tags v-model:value="tags" draggable />
  </n-space>
</template>
