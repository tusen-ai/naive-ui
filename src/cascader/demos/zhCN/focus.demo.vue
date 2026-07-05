<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts" setup>
import type { CascaderInst } from 'naive-ui'
import { ref } from 'vue'

const cascaderInstRef = ref<CascaderInst | null>(null)

function handleClick() {
  cascaderInstRef.value?.focus()
  setTimeout(() => {
    cascaderInstRef.value?.blur()
  }, 1000)
}
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-cascader ref="cascaderInstRef" style="width: 200px" />
  </n-space>
</template>
