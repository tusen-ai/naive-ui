<markdown>
# 按钮位置

按钮可以被放在两侧。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" button-placement="both" />
    <n-input-number v-model:value="value" button-placement="both">
      <template #prefix>
        $
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" button-placement="both">
      <template #suffix>
        ฿
      </template>
    </n-input-number>
  </n-space>
</template>
