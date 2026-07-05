<markdown>
# 可关闭

用于 Modal 的时候，你可能需要这个属性。
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleClose() {
  message.info('Card Close')
}
</script>

<template>
  <n-card title="卡片" closable @close="handleClose">
    卡片内容
  </n-card>
</template>

<style>
.n-card {
  max-width: 300px;
}
</style>
