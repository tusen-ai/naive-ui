<markdown>
# Focus & blur manually
</markdown>

<script lang="ts">
import type { CheckboxInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

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
      Focus then blur in 1 second
    </n-button>
    <n-checkbox ref="checkboxInstRef" />
  </n-space>
</template>
