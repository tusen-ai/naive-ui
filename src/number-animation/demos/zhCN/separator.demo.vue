<markdown>
# 分隔符

欢乐豆太多的时候容易数不清有几位。
</markdown>

<script lang="ts">
import type { NumberAnimationInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    return {
      numberAnimationInstRef,
      handleClick() {
        numberAnimationInstRef.value?.play()
      }
    }
  }
})
</script>

<template>
  <n-statistic label="一个小目标" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
    />
  </n-statistic>
  <n-button @click="handleClick">
    播放
  </n-button>
</template>
