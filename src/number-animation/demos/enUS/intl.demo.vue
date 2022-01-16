<markdown>
# Internationalization

use `locale` to set internationalization language.
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
