<markdown>
# Vertical

Set `vertical` to enable the vertical mode. Its height depends on the height of the container by default, and you can also customize the height.
</markdown>

<template>
  <n-space style="height: 300px; justify-content: center">
    <n-slider :default-value="77" vertical />
    <n-slider :default-value="20" vertical reverse />
    <n-slider :default-value="30" vertical disabled />
    <n-slider v-model:value="value" :marks="marks" vertical range />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([20, 70]),
      marks: {
        0: '0°C',
        20: '20°C',
        37: '37°C',
        100: '100°C'
      }
    }
  }
})
</script>
