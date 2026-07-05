<markdown>
# Basic
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
