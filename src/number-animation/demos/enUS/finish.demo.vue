<markdown>
# Finish callback
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { NumberAnimationInst } from 'naive-ui'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    const message = useMessage()
    return {
      numberAnimationInstRef,
      handleClick() {
        numberAnimationInstRef.value?.play()
      },
      handleFinish() {
        message.success('Finished')
      }
    }
  }
})
</script>

<template>
  <n-statistic label="Post message on finish" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
      @finish="handleFinish"
    />
  </n-statistic>
  <n-button @click="handleClick">
    Play
  </n-button>
</template>
