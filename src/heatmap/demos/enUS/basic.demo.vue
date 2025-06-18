<markdown>
# Basic

Every square is a piece of persistence, and blanks are the rhythm of life.
</markdown>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateHeatmapData } from '../../src/utils'

const value = ref<'recent' | number>('recent')
const dateRanges = [
  {
    value: 'recent',
    label: 'Recent Year'
  },
  {
    value: 2025,
    label: '2025'
  },
  {
    value: 2024,
    label: '2024'
  },
  {
    value: 2023,
    label: '2023'
  },
  {
    value: 2022,
    label: '2022'
  }
]

const yearData = computed(() => {
  return generateHeatmapData(value.value)
})

const dataStats = computed(() => {
  const data = yearData.value
  const total = data.length
  const zeros = data.filter(d => d.value === 0).length
  const maxValue = Math.max(...data.map(d => d.value ?? 0))
  const avgValue
    = Math.round(
      (data.reduce((sum, d) => sum + (d.value ?? 0), 0) / total) * 100
    ) / 100

  return {
    total,
    zeros,
    maxValue,
    avgValue,
    zeroPercent: Math.round((zeros / total) * 100)
  }
})

const showLabels = ref(true)
const showColorIndicator = ref(true)
const weekStartOn = ref<0 | 1 | 2 | 3 | 4 | 5 | 6>(0)

const weekStartOptions = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 }
]
</script>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="value" name="year">
      <n-radio-button
        v-for="range in dateRanges"
        :key="range.value"
        :value="range.value"
        :label="range.label"
      />
    </n-radio-group>

    <n-card title="Display Controls" size="small" style="min-width: 600px">
      <n-space align="center" justify="start">
        <n-switch v-model:value="showLabels">
          <template #checked>
            Show Labels
          </template>
          <template #unchecked>
            Hide Labels
          </template>
        </n-switch>
        <n-switch v-model:value="showColorIndicator">
          <template #checked>
            Show Color Indicator
          </template>
          <template #unchecked>
            Hide Color Indicator
          </template>
        </n-switch>
        <n-divider vertical />
        <span>Week Starts On:</span>
        <n-select
          v-model:value="weekStartOn"
          :options="weekStartOptions"
          style="width: 120px"
        />
      </n-space>
    </n-card>

    <n-alert type="success" title="Data Statistics">
      <n-space>
        <n-tag round type="info">
          Total Days: {{ dataStats.total }}
        </n-tag>
        <n-tag round type="warning">
          Empty Days: {{ dataStats.zeros }} ({{ dataStats.zeroPercent }}%)
        </n-tag>
        <n-tag round type="success">
          Max Value: {{ dataStats.maxValue }}
        </n-tag>
        <n-tag round type="primary">
          Average: {{ dataStats.avgValue }}
        </n-tag>
      </n-space>
    </n-alert>

    <n-heatmap
      :key="`heatmap-${value}-${weekStartOn}`"
      :data="yearData"
      :week-start-on="weekStartOn"
      unit="activities"
      :show-labels="showLabels"
      :show-color-indicator="showColorIndicator"
    />
  </n-space>
</template>
