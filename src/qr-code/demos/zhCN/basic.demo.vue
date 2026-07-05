<markdown>
# 基础用法

基础二维码。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('雨淋湿了天空')
</script>

<template>
  <n-space vertical>
    <n-qr-code :value="text" />
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-space>
</template>
