<markdown>
# 前缀 & 后缀

在前缀后缀添加内容
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value">
      <template #prefix>
        ￥
      </template>
    </n-input-number>
    <n-input-number v-model:value="value">
      <template #suffix>
        %
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" :show-button="false">
      <template #suffix>
        %
      </template>
    </n-input-number>
  </n-space>
</template>
