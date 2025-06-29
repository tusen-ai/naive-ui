<markdown>
# 遮罩关闭

使用 `mask-closable=false` 使点击遮罩层不发出关闭事件。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  message.success('Submit')
  showModal.value = false
}
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="你确认"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>
