<markdown>
# 格式化弹出提示
</markdown>

<template>
  <n-slider :default-value="50" :step="10" :format-tooltip="formatTooltip" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      formatTooltip: (value: number) => `${value}%`
    }
  }
})
</script>
