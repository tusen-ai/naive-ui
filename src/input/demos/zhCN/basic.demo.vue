<markdown>
# 基础用法

文本输入的基础用法。
</markdown>

<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="基本的 Textarea"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
