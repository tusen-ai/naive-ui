<markdown>
# 国际化

使用 `locale` 设定国际化语言。

需要注意的是，该功能使用了 `Intl` API，兼容性请参考 [format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) 和 [formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)。
</markdown>

<template>
  <n-statistic label="你可能不知道俄语的小数点是逗号" tabular-nums>
    <n-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="699700.699"
      :active="false"
      :precision="3"
      locale="ru-RU"
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
