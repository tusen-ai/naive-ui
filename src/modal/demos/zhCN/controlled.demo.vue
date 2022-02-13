<markdown>
# 受控显示

模态框的显示可以是受控的。
</markdown>

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
