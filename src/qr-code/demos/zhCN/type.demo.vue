<markdown>
# 自定义渲染类型

通过设置 `type` 自定义渲染结果，提供 `canvas` 和 `svg` 两个选项。

</markdown>

<template>
  <n-space>
    <n-qr-code :value="text" type="canvas" />
    <n-qr-code :value="text" type="svg" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('雨淋湿了天空')
    return {
      text
    }
  }
})
</script>
