<markdown>
# 显示排序按钮
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', '', ''])
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    show-sort-button
    placeholder="请输入"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
