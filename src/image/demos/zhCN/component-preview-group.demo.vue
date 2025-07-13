<markdown>
# 单独使用多图预览组件

`单独使用 <n-image-group> 预览多张图片`
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const currentIndex = ref(0)

const showRef = ref(false)
function onClick() {
  showRef.value = true
}

const message = useMessage()
function handleUpdateShow(value: boolean) {
  message.info(`${value}`)
}

function handleUpdateCurrent(current: number) {
  message.info(`${current}`)
}
</script>

<template>
  <n-button type="primary" @click="onClick">
    Click me to preview multiple image
  </n-button>
  <n-image-group
    v-model:show="showRef"
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
    @update:show="handleUpdateShow"
    @update:current="handleUpdateCurrent"
  />
  <pre>currentIndex: {{ currentIndex }}</pre>
</template>
