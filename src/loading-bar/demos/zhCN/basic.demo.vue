<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'
import { ref } from 'vue'

const loadingBar = useLoadingBar()
const disabled = ref(true)

function handleStart() {
  loadingBar.start()
  disabled.value = false
}

function handleFinish() {
  loadingBar.finish()
  disabled.value = true
}

function handleError() {
  disabled.value = true
  loadingBar.error()
}
</script>

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
