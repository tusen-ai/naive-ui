<markdown>
# 手动打开预览

允许通过调用 showPreview 来触发大图预览。
</markdown>

<script lang="ts" setup>
import type { ImageInst } from 'naive-ui'
import { ref } from 'vue'

const imageRef = ref<ImageInst | null>(null)

function handleClick() {
  imageRef.value?.showPreview()
}
</script>

<template>
  <n-flex vertical inline>
    <n-button @click="handleClick">
      show image preview
    </n-button>
    <n-image
      ref="imageRef"
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-flex>
</template>
