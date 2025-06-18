<markdown>
# 受控状态
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <n-space align="center" item-style="display: flex;">
    <n-checkbox :checked="value">
      复选框
    </n-checkbox>
    <n-switch v-model:value="value" />
  </n-space>
</template>
