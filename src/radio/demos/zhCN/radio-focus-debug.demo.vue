<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <n-radio v-model:value-value="value" value="Definitely Maybe">
    <n-input />
  </n-radio>
</template>
