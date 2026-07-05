<markdown>
# 不显示遮罩层

也可以不显示模态框的遮罩层，可以拿来做一个悬浮窗。

注意，此时遮罩层相关的 API 将不起作用，焦点也不会被限制在 Modal 内部（这会导致键盘事件例如 Esc 不总是生效）。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    来个悬浮窗
  </n-button>
  <n-modal
    v-model:show="showModal"
    style="width: 800px"
    preset="card"
    draggable
    title="悬浮窗"
    :show-mask="false"
  >
    悬浮窗
  </n-modal>
</template>
