<markdown>
# Update callback
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
    <n-statistic label="NumberAnimation sync progress bar" tabular-nums>
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
      Play
    </n-button>
  </n-space>
</template>
