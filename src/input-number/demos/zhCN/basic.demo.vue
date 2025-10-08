<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" clearable />
    <n-tag type="success" size="small" round>
      当前值：{{ JSON.stringify(value) }}
    </n-tag>
  </n-space>
</template>
