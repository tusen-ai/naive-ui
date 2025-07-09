<markdown>
# 受控显示

模态框的显示可以是受控的。
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
    来吧
  </n-button>
  <n-modal :show="showModal">
    <n-card
      style="width: 600px"
      title="模态框"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      倒计时 {{ timeout / 1000 }} 秒
    </n-card>
  </n-modal>
</template>
