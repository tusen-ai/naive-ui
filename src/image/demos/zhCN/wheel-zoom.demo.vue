<markdown>
# 鼠标滚轮缩放

使用鼠标滚轮可以放大图片，向下滚动只能缩小到原图大小，不能更小。可以通过`enable-wheel`属性来控制是否启用此功能。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      enableWheel: ref(true)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-switch v-model:value="enableWheel" />
      <span>启用鼠标滚轮缩放: {{ enableWheel ? '是' : '否' }}</span>
    </n-space>
    <n-image
      width="300"
      :enable-wheel="enableWheel"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-space>
</template>
