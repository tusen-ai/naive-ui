<markdown>
# 使用 Card 预设

模态框有一些预设，让你在设定之后可以使用对应的 slots 还有 props。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const bodyStyle = {
  width: '600px'
}
const segmented = {
  content: 'soft',
  footer: 'soft'
} as const
const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="卡片预设"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header-extra>
      噢!
    </template>
    内容
    <template #footer>
      尾部
    </template>
  </n-modal>
</template>
