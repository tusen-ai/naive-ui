<markdown>
# 基础用法

字符数由 length 选项定义，默认情况下设置为 6。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-input-opt v-model:value="value" />
</template>
