<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts" setup>
import type { SelectInst } from 'naive-ui'
import { ref } from 'vue'

const selectInstRef = ref<SelectInst | null>(null)

function handleClick() {
  selectInstRef.value?.focus()
  setTimeout(() => {
    selectInstRef.value?.blur()
  }, 1000)
}
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-select ref="selectInstRef" style="width: 200px" />
  </n-space>
</template>
