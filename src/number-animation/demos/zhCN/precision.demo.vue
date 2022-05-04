<markdown>
# 精度

使用 `precision` 设定精度。
</markdown>

<template>
  <n-statistic label="JJJJNM" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="24.0"
      :active="false"
      :precision="2"
    />
  </n-statistic>
  <n-button @click="handleClick">
    播放
  </n-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NumberAnimationInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    return {
      numberAnimationInstRef,
      handleClick () {
        numberAnimationInstRef.value?.play()
      }
    }
  }
})
</script>
