<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts">
import type { SelectInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const selectInstRef = ref<SelectInst | null>(null)
    return {
      handleClick() {
        selectInstRef.value?.focus()
        setTimeout(() => {
          selectInstRef.value?.blur()
        }, 1000)
      },
      selectInstRef
    }
  }
})
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-select ref="selectInstRef" style="width: 200px" />
  </n-space>
</template>
