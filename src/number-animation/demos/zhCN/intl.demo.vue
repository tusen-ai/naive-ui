<markdown>
# 国际化

使用 `locale` 设定国际化语言。
</markdown>

<template>
  <n-statistic label="Intl ru-RU" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="1879.314"
      :active="false"
      :precision="3"
      :locale="'ru-RU'"
      show-separator
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
