<markdown>
# 标题偏移

在 `title-placement` 为 `before` 或 `after` 时，添加 `offset` 属性可以设置标题与分割线的偏移量。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const beforeOffset = ref(0)
const afterOffset = ref(0)
</script>

<template>
  <n-input-number v-model:value="beforeOffset" :min="0" />
  <n-divider title-placement="before" :offset="beforeOffset">
    前
  </n-divider>
  <n-input-number v-model:value="afterOffset" :min="0" />
  <n-divider title-placement="after" type="dashed" :offset="afterOffset">
    后
  </n-divider>
</template>
