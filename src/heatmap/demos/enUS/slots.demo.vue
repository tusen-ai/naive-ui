<markdown>
# Slots

Customize footer area with info slot and indicator slot.
</markdown>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateHeatmapData } from '../../src/utils'

const value = ref<'recent' | number>('recent')
const yearData = computed(() => {
  return generateHeatmapData(value.value)
})
</script>

<template>
  <n-flex vertical>
    <n-heatmap :data="yearData" unit="activities" :show-color-indicator="false">
      <template #info>
        <n-text depth="3">
          Left info slot
        </n-text>
      </template>
      <template #indicator>
        <n-text depth="3">
          Right indicator slot
        </n-text>
      </template>
    </n-heatmap>
  </n-flex>
</template>
