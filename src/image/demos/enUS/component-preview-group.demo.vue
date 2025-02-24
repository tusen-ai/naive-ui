<markdown>
# Multi-image preview

`to wrap the <n-image-group> component to preview multiple images.`
</markdown>

<script lang="ts" setup>
import type { ImageGroupInst } from 'naive-ui'
import { ref } from 'vue'

const currentIndex = ref(0)

const imageGroupRef = ref<ImageGroupInst>()
function onClick() {
  imageGroupRef.value?.toggleShow()
}
</script>

<template>
  <n-button type="primary" @click="onClick">
    Click me to preview multiple image
  </n-button>
  <n-image-group
    ref="imageGroupRef"
    v-model:current="currentIndex"
    :src-list="[
      'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
      'https://picsum.photos/id/1/100/100',
      'https://picsum.photos/id/2/100/100',
      'https://picsum.photos/id/3/100/100',
      'https://picsum.photos/id/4/100/100',
      'https://picsum.photos/id/5/100/100',
      'https://picsum.photos/id/7/100/100',
      'https://picsum.photos/id/8/100/100',
      'https://picsum.photos/id/9/100/100',
      'https://picsum.photos/id/10/100/100',
    ]"
  />
  <pre>currentIndex: {{ currentIndex }}</pre>
</template>
