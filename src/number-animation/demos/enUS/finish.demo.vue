<markdown>
# Finish callback
</markdown>

<script lang="ts" setup>
import type { NumberAnimationInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
const message = useMessage()

function handleClick() {
  numberAnimationInstRef.value?.play()
}

function handleFinish() {
  message.success('Finished')
}
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
