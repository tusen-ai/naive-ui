<markdown>
# I18n

Use `locale` to set i18n language.

Please note that, the feature uses `Intl` API. For compitability refers to [format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) and [formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts).

</markdown>

<template>
  <n-statistic label="ru-RU" tabular-nums>
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
