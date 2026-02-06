<markdown>
# Loop

Use `loop` to control whether the image group preview loops, defaults to `true`.
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
        Loop
      </template>
      <template #unchecked>
        No Loop
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
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-space>
    </n-image-group>
  </n-space>
</template>
