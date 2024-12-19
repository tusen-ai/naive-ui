<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts">
import type { CascaderInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cascaderInstRef = ref<CascaderInst | null>(null)
    return {
      handleClick() {
        cascaderInstRef.value?.focus()
        setTimeout(() => {
          cascaderInstRef.value?.blur()
        }, 1000)
      },
      cascaderInstRef
    }
  }
})
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-cascader ref="cascaderInstRef" style="width: 200px" />
  </n-space>
</template>
