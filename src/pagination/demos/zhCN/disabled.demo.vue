<markdown>
# 禁用
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
const pageSize = ref(20)
const disabled = ref(true)
</script>

<template>
  <n-space vertical>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="100"
      show-size-picker
      :page-sizes="[10, 20, 30, 40]"
      show-quick-jumper
      :disabled="disabled"
    />
    <n-switch v-model:value="disabled" />
  </n-space>
</template>
