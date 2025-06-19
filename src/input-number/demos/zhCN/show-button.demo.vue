<markdown>
# 隐藏按钮

使用 `show-button` 属性来控制是否展示按钮。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
const disabled = ref(true)
</script>

<template>
  <n-space align="center">
    <n-switch v-model:value="disabled" />
    <n-input-number v-model:value="value" :show-button="disabled" />
  </n-space>
</template>
