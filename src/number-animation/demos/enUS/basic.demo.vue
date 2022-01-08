<markdown>
# Basic
</markdown>

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
