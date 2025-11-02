<markdown>
# Custom Mark

You can use `marks` prop to customize handle button.
</markdown>

<script lang="ts" setup>
import Temperature16Regular from '@vicons/fluent/Temperature16Regular'
import { NFlex, NIcon } from 'naive-ui'
import { h, ref } from 'vue'

function renderMark(value: number, color: string) {
  return h(
    NFlex,
    { style: { width: '120px' } },
    {
      default: () => [
        h(NIcon, { size: 24, color, component: Temperature16Regular }),
        h('span', { style: { color } }, `${value}°C`)
      ]
    }
  )
}

const value = ref([20, 70])
const marks = {
  0: '0°C',
  20: '20°C',
  60: '60°C',
  100: '100°C'
}
const customMarks = {
  0: () => renderMark(0, '#0048BA'),
  20: () => renderMark(20, '#00BFFF'),
  60: () => renderMark(60, '#FFA500'),
  100: () => renderMark(100, '#FF4500')
}
</script>

<template>
  <n-space style="height: 300px; justify-content: space-evenly">
    <n-slider v-model:value="value" :marks="marks" vertical range />
    <n-slider v-model:value="value" :marks="customMarks" vertical range />
  </n-space>
</template>
