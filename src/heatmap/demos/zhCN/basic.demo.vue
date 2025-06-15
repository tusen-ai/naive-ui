<markdown>
# 基础用法

地铁都比你努力
</markdown>

<script setup lang="ts">
import { eachDayOfInterval, endOfYear, startOfYear, subYears } from 'date-fns' // 添加 subYears
import { computed, ref } from 'vue'

interface DailyData {
  date: Date
  value: number
}

const value = ref('recent')
const dateRanges = [
  {
    value: 'recent',
    label: '最近一年'
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
})

function generateData(range: string | number): DailyData[] {
  let start: Date
  let end: Date

  if (range === 'recent') {
    end = new Date()
    start = subYears(end, 1)
  }
  else {
    const year = Number(range)
    start = startOfYear(new Date(year, 0, 1))
    end = endOfYear(new Date(year, 11, 31))
  }
  const allDays = eachDayOfInterval({ start, end })
  return allDays.map(day => ({
    date: day,
    value: Math.floor(Math.random() * 300) + 1
  }))
}

const yearData = computed(() => generateData(value.value))
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
    <n-heatmap :data="yearData" unit="commit" />
  </n-space>
</template>
