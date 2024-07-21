<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { CheckboxInst } from 'naive-ui'

export default defineComponent({
  setup() {
    const checkboxInstRef = ref<CheckboxInst | null>(null)
    return {
      handleClick() {
        checkboxInstRef.value?.focus()
        setTimeout(() => {
          checkboxInstRef.value?.blur()
        }, 1000)
      },
      checkboxInstRef
    }
  }
})
</script>

<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-checkbox ref="checkboxInstRef" />
  </n-space>
</template>
