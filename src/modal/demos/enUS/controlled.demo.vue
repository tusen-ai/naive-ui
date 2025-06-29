<markdown>
# Controlled

Modal can be controlled.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
const timeout = ref(6000)

function countdown() {
  if (timeout.value <= 0) {
    showModal.value = false
  }
  else {
    timeout.value -= 1000
    setTimeout(countdown, 1000)
  }
}

function handleClick() {
  showModal.value = true
  timeout.value = 6000

  countdown()
}
</script>

<template>
  <n-button @click="handleClick">
    Start me up
  </n-button>
  <n-modal :show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      Countdown {{ timeout / 1000 }}s
    </n-card>
  </n-modal>
</template>
