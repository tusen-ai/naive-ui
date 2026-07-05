<markdown>
# 精度

使用 `precision` 设定精度。
</markdown>

<script lang="ts" setup>
import type { NumberAnimationInst } from 'naive-ui'
import { ref } from 'vue'

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
function handleClick() {
  numberAnimationInstRef.value?.play()
}
</script>

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
