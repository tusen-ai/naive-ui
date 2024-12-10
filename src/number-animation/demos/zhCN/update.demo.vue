<markdown>
# 更新的回调
</markdown>

<script lang="ts">
import type { NumberAnimationInst } from 'naive-ui'
import { round } from 'lodash-es'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    const updateValue = ref<number>(0)
    const precision = 2
    return {
      numberAnimationInstRef,
      updateValue,
      precision,
      handleClick() {
        numberAnimationInstRef.value?.play()
      },
      handleUpdate(value: number) {
        updateValue.value = round(value, precision)
      }
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-statistic label="数值动画同步进度条" tabular-nums>
      <n-number-animation
        ref="numberAnimationInstRef"
        show-separator
        :from="0"
        :to="100"
        :active="false"
        :duration="5 * 1000"
        :precision="precision"
        @update="handleUpdate"
      />
      <div
        :style="{
          width: `${updateValue}%`,
          height: '4px',
          backgroundColor: '#000',
        }"
      />
    </n-statistic>
    <n-button @click="handleClick">
      开始
    </n-button>
  </n-space>
</template>
