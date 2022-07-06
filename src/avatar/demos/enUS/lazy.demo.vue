<markdown>
# Lazy load

You can use `lazy` to let image load after it enters viewport.
</markdown>

<template>
  <div
    id="image-scroll-container"
    style="overflow: auto; height: 100px; gap: 8px"
  >
    <n-space vertical>
      <n-avatar
        v-for="i of range"
        :key="i"
        size="small"
        :src="
          'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg?t=' + i
        "
        lazy
        :intersection-observer-options="{
          root: '#image-scroll-container'
        }"
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: Array.from({ length: 10 }, (_, i) => i + 1)
    }
  }
})
</script>
