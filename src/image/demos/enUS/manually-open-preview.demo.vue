<markdown>
# Manually Open Preview

allow big image preview by call showPreview method.
</markdown>

<script lang="ts" setup>
import type { ImageInst } from 'naive-ui'
import { ref } from 'vue'

const imageRef = ref<ImageInst>()
function handleClick() {
  imageRef.value?.showPreview()
}
</script>

<template>
  <n-space vertical>
    <n-button type="primary" @click="handleClick">
      show image preview
    </n-button>
    <n-image
      ref="imageRef"
      width="100"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>
