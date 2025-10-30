<markdown>
# Basic
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
  <n-statistic label="Well" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="9.96"
      :to="0.07"
      :active="false"
      :precision="2"
    />
  </n-statistic>
  <n-button @click="handleClick">
    Play
  </n-button>
</template>
