<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts" setup>
import type { CheckboxInst } from 'naive-ui'
import { ref } from 'vue'

const checkboxInstRef = ref<CheckboxInst | null>(null)

function handleClick() {
  checkboxInstRef.value?.focus()
  setTimeout(() => {
    checkboxInstRef.value?.blur()
  }, 1000)
}
</script>

<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-checkbox ref="checkboxInstRef" />
  </n-space>
</template>
