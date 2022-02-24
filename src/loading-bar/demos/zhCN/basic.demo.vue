<markdown>
# 基础用法
</markdown>

<template>
  <n-space>
    <n-button @click="handleStart">
      开始
    </n-button>
    <n-button :disabled="disabled" @click="handleFinish">
      结束
    </n-button>
    <n-button @click="handleError">
      报个错
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLoadingBar } from 'naive-ui'

export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    const disabledRef = ref(true)
    return {
      disabled: disabledRef,
      handleStart () {
        loadingBar.start()
        disabledRef.value = false
      },
      handleFinish () {
        loadingBar.finish()
        disabledRef.value = true
      },
      handleError () {
        disabledRef.value = true
        loadingBar.error()
      }
    }
  }
})
</script>
