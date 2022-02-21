<markdown>
# 受控状态
</markdown>

<template>
  <n-space align="center" item-style="display: flex;">
    <n-checkbox :checked="value">
      复选框
    </n-checkbox>
    <n-switch v-model:value="value" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false)
    }
  }
})
</script>
