<markdown>
# 结束的回调
</markdown>

<script lang="ts">
import type { NumberAnimationInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

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
  <n-statistic label="完成之后发个消息" tabular-nums>
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
    开始
  </n-button>
</template>
