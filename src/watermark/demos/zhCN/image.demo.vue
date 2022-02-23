<markdown>
# 图片

放点图。

记得注意图像 URL 的跨域设置，这会影响图片是否能正常显示。
</markdown>

<template>
  <n-watermark
    v-if="show"
    image="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="0"
    :image-width="64"
    :image-opacity="0.24"
  />
  <n-switch v-model:value="show" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
