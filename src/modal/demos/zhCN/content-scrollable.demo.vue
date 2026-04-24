<markdown>
# 内容滚动

使用 Card 预设时，开启 `content-scrollable` 可以让滚动仅发生在内容区域，标题和底部保持固定。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    打开
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="Content Scrollable"
    content-scrollable
    :style="{ width: '600px', height: '400px' }"
    :segmented="{ content: true, footer: true }"
  >
    <p v-for="i in 30" :key="i" style="margin: 0 0 8px 0">
      第 {{ i }} 行内容，只有这里会滚动。
    </p>
    <template #footer>
      固定在底部的操作区
    </template>
  </n-modal>
</template>
