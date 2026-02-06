<markdown>
# 循环播放

使用 `loop` 控制图片组预览是否循环播放，默认为 `true`。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      loop: ref(true)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-switch v-model:value="loop">
      <template #checked>
        循环
      </template>
      <template #unchecked>
        不循环
      </template>
    </n-switch>
    <n-image-group :loop="loop">
      <n-space>
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-image
          width="100"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
        <n-image width="100" src="https://picsum.photos/id/9/100/100" />
      </n-space>
    </n-image-group>
  </n-space>
</template>
