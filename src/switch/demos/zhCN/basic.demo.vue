<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <n-space>
    <n-switch v-model:value="active" />
    <n-switch v-model:value="active" disabled />
  </n-space>
</template>
