<markdown>
# 基础用法
</markdown>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value">
      复选框
    </n-checkbox>
    <n-checkbox v-model:checked="value" />
    <n-checkbox v-model:checked="value" :disabled="disabled">
      复选框
    </n-checkbox>
    <n-button size="small" @click="disabled = !disabled">
      禁用
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      disabled: ref(true)
    }
  }
})
</script>
