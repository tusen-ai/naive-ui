<markdown>
# Slots

Customize footer area with info slot and indicator slot. Also supports custom tooltip content.
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'
import { computed, ref } from 'vue'

const value = ref<'recent' | number>('recent')
const yearData = computed(() => {
  return heatmapMockData(value.value)
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
      <template #tooltip="{ timestamp: date, value: tooltipValue, unit }">
        <div>
          <div>
            <strong>Date:</strong> {{ new Date(date).toLocaleDateString() }}
          </div>
          <div><strong>Value:</strong> {{ tooltipValue ?? 0 }} {{ unit }}</div>
          <div v-if="tooltipValue !== null && tooltipValue > 5">
            <n-tag type="success" size="small">
              High Activity
            </n-tag>
          </div>
        </div>
      </template>
    </n-heatmap>

    <n-divider />

    <h4>Disabled Tooltip</h4>
    <n-heatmap :data="yearData" unit="activities" :tooltip="false">
      <template #info>
        <n-text depth="3">
          Tooltip disabled
        </n-text>
      </template>
    </n-heatmap>

    <n-divider />

    <h4>Custom Tooltip Configuration</h4>
    <n-heatmap
      :data="yearData"
      unit="activities"
      :tooltip="{ placement: 'bottom', delay: 500 }"
    >
      <template #info>
        <n-text depth="3">
          Bottom tooltip with 500ms delay
        </n-text>
      </template>
      <template #tooltip="{ timestamp: date, value: tooltipValue, unit }">
        <n-card size="small" style="max-width: 200px">
          <template #header>
            Activity Details
          </template>
          <div>{{ new Date(date).toLocaleDateString() }}</div>
          <div>{{ tooltipValue ?? 0 }} {{ unit }}</div>
        </n-card>
      </template>
    </n-heatmap>
  </n-flex>
</template>
