<markdown>
# 无边框
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const bordered = ref(true)
</script>

<template>
  <n-space vertical :size="12">
    <n-switch v-model:value="bordered" />
    <n-alert title="可以没有边框" type="info" :bordered="bordered">
      Gee it's good to be back home
    </n-alert>
  </n-space>
</template>
