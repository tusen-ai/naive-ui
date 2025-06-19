<markdown>
# 尺寸

热力图有 `small`、`medium` 和 `large` 三种尺寸。当没有明确指定 `xGap` 和 `yGap` 时，会根据尺寸自动调整间距。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const data = Array.from({ length: 100 }, (_, i) => ({
      date: new Date(2023, 0, i + 1),
      value: Math.floor(Math.random() * 10)
    }))

    return {
      data
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-card title="Small Size">
      <n-heatmap :data="data" unit="commits" size="small" />
    </n-card>

    <n-card title="Medium Size (默认)">
      <n-heatmap :data="data" unit="commits" size="medium" />
    </n-card>

    <n-card title="Large Size">
      <n-heatmap :data="data" unit="commits" size="large" />
    </n-card>

    <n-card title="自定义间距 (忽略尺寸)">
      <n-heatmap
        :data="data"
        unit="commits"
        size="large"
        :x-gap="1"
        :y-gap="1"
      />
    </n-card>
  </n-space>
</template>
