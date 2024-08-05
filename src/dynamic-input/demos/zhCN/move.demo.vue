<markdown>
# 显示排序按钮
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(['', '', ''])
    }
  }
})
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    show-sort-button
    placeholder="请输入"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
