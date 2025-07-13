<markdown>
# Basic

Every square is a piece of persistence, and blanks are the rhythm of life.
</markdown>

<script setup lang="ts">
import type { WeekStartsOn } from 'naive-ui'
import { heatmapMockData } from 'naive-ui'
import { computed, ref } from 'vue'

const value = ref<'recent' | number>('recent')
const dateRanges = [
  {
    value: 'recent',
    label: 'Recent Year'
  },
  {
    value: 2025,
    label: 2025
  },
  {
    value: 2024,
    label: 2024
  },
  {
    value: 2023,
    label: 2023
  },
  {
    value: 2022,
    label: 2022
  }
].map((r) => {
  return {
    ...r,
    label: r.label.toString()
  }
}) as {
  value: 'recent' | number
  label: string
}[]

const yearData = computed(() => {
  return heatmapMockData(value.value)
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

const showWeekLabels = ref(true)
const showMonthLabels = ref(true)
const showColorIndicator = ref(true)
const loading = ref(false)
const weekStartsOn = ref<WeekStartsOn>(0)
const size = ref<'small' | 'medium' | 'large'>('medium')

const weekStartOptions = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 }
]

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' }
]
</script>

<template>
  <n-flex vertical>
    <n-flex align="center" justify="start">
      <n-switch v-model:value="showWeekLabels">
        <template #checked>
          Show Week Labels
        </template>
        <template #unchecked>
          Hide Week Labels
        </template>
      </n-switch>
      <n-switch v-model:value="showMonthLabels">
        <template #checked>
          Show Month Labels
        </template>
        <template #unchecked>
          Hide Month Labels
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
      <n-switch v-model:value="loading">
        <template #checked>
          Loading
        </template>
        <template #unchecked>
          Normal
        </template>
      </n-switch>
    </n-flex>
    <n-flex align="center" justify="start">
      <n-text>Week Starts On:</n-text>
      <n-select
        v-model:value="weekStartsOn"
        :options="weekStartOptions"
        style="width: 120px"
      />
      <n-divider vertical />
      <n-text>Size:</n-text>
      <n-radio-group v-model:value="size" name="size">
        <n-radio-button
          v-for="option in sizeOptions"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </n-radio-group>
      <n-divider vertical />
      <n-radio-group v-model:value="value" name="year">
        <n-radio-button
          v-for="range in dateRanges"
          :key="range.value"
          :value="range.value"
          :label="range.label"
        />
      </n-radio-group>
    </n-flex>

    <n-alert type="success" title="Data Statistics">
      <n-flex>
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
      </n-flex>
    </n-alert>

    <n-flex align="center">
      <n-heatmap
        :key="`heatmap-${value}-${weekStartsOn}-${size}`"
        :data="yearData"
        :week-starts-on="weekStartsOn"
        :loading="loading"
        :size="size"
        unit="commits"
        :show-week-labels="showWeekLabels"
        :show-month-labels="showMonthLabels"
        :show-color-indicator="showColorIndicator"
      />
    </n-flex>
  </n-flex>
</template>
