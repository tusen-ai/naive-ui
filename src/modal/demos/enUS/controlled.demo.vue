<markdown>
# Controlled

Modal can be controlled.
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showModalRef = ref(false)
    const timeoutRef = ref(6000)

    const countdown = () => {
      if (timeoutRef.value <= 0) {
        showModalRef.value = false
      } else {
        timeoutRef.value -= 1000
        setTimeout(countdown, 1000)
      }
    }

    const handleClick = () => {
      showModalRef.value = true
      timeoutRef.value = 6000

      countdown()
    }

    return {
      showModal: showModalRef,
      timeout: timeoutRef,
      handleClick
    }
  }
})
</script>
