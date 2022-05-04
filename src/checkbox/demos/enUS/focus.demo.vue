<markdown>
# Focus & blur manually
</markdown>

<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-button @click="handleClick">
      Focus then blur in 1 second
    </n-button>
    <n-checkbox ref="checkboxInstRef" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CheckboxInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const checkboxInstRef = ref<CheckboxInst | null>(null)
    return {
      handleClick () {
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
