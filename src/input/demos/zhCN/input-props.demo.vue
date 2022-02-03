<markdown>
# 原生属性

`input` 有一些比较特殊的 DOM 属性，有时候你可能会想使用，比如 `auto-complete` 或者特殊的 type。你可以使用 `input-props` 设定。
</markdown>

<template>
  <n-space vertical>
    <n-input
      v-model:value="value"
      :input-props="{ type: 'url' }"
      placeholder="URL"
    />
    <n-input
      v-model:value="value"
      :input-props="{ type: 'tel' }"
      placeholder="Tel"
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
