<markdown>
# Size
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
</script>

<template>
  <n-space vertical>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="small"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="medium"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="large"
      show-quick-jumper
      show-size-picker
    />
  </n-space>
</template>
