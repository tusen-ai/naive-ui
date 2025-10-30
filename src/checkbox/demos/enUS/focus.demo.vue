<markdown>
# Focus & blur manually
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
      Focus then blur in 1 second
    </n-button>
    <n-checkbox ref="checkboxInstRef" />
  </n-space>
</template>
