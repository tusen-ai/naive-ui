<markdown>
# Basic
</markdown>

<script lang="ts">
import { useLoadingBar } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loadingBar = useLoadingBar()
    const disabledRef = ref(true)
    return {
      disabled: disabledRef,
      handleStart() {
        loadingBar.start()
        disabledRef.value = false
      },
      handleFinish() {
        loadingBar.finish()
        disabledRef.value = true
      },
      handleError() {
        disabledRef.value = true
        loadingBar.error()
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-button @click="handleStart">
      start
    </n-button>
    <n-button :disabled="disabled" @click="handleFinish">
      finish
    </n-button>
    <n-button @click="handleError">
      error
    </n-button>
  </n-space>
</template>
