<markdown>
# 单独使用预览组件

`n-image-preview` 可单独使用。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const showRef = ref(false)
function onClick() {
  showRef.value = true
}

const message = useMessage()

function handleUpdateShow(value: boolean) {
  message.info(`${value}`)
}

function handleClose() {
  message.info('close')
}
</script>

<template>
  <n-button type="primary" @click="onClick">
    点击预览图片
  </n-button>
  <n-image-preview
    v-model:show="showRef"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    @update:show="handleUpdateShow"
    @close="handleClose"
  />
</template>
