<markdown>
# Use Preview alone

`n-image-preview` can be used alone。
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
    Click me to preview image
  </n-button>
  <n-image-preview
    v-model:show="showRef"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    @update:show="handleUpdateShow"
    @close="handleClose"
  />
</template>
