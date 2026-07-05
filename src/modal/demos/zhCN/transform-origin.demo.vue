<markdown>
# 变换原点

虽然从点击位置展开模态框的动画很好看，但是有时候我们需要简单点的从屏幕中间开始的动画。你可以把 `transform-origin` 设为 `'center'` 来达成这个效果。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    没什么
  </n-button>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      style="width: 600px"
      title="好的"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        行
      </template>
      可以
      <template #footer>
        不错
      </template>
    </n-card>
  </n-modal>
</template>
