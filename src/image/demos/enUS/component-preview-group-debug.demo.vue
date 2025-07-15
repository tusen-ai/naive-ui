<markdown>
# debug preview group
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const currentIndex = ref(1)
const showRef = ref(false)
function onClick() {
  showRef.value = true
}

const currentIndex2 = ref(0)
const showRef2 = ref(false)
function onClick2() {
  showRef2.value = true
}
</script>

<template>
  <n-space vertical>
    <p>src-list && n-image</p>
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
    >
      <n-space>
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-image
          width="100"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </n-space>
    </n-image-group>
    <pre>currentIndex: {{ currentIndex }}</pre>

    <p>n-image</p>
    <n-button type="primary" @click="onClick2">
      Click me to preview multiple image
    </n-button>
    <n-image-group v-model:show="showRef2" v-model:current="currentIndex2">
      <n-space>
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-image
          width="100"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </n-space>
    </n-image-group>
    <pre>currentIndex: {{ currentIndex2 }}</pre>
  </n-space>
</template>
