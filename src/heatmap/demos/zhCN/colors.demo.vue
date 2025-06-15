<markdown>
# 自定义颜色

支持传入自定义颜色数组，颜色按从浅到深的顺序排列，会根据数值大小自动分配到对应的颜色层级。
</markdown>

<script setup lang="ts">
import { eachDayOfInterval, subYears } from 'date-fns'
import { ref } from 'vue'

interface DailyData {
  date: Date
  value: number
}

function generateData(): DailyData[] {
  const end = new Date()
  const start = subYears(end, 1)
  const allDays = eachDayOfInterval({ start, end })
  const yearSeed = new Date().getFullYear()

  return allDays.map((day, index) => {
    const dayOfWeek = day.getDay()
    const month = day.getMonth()

    // 多层随机数
    const r1 = ((index * 7 + yearSeed * 13) % 997) / 997
    const r2 = ((index * 11 + day.getDate() * 17) % 991) / 991
    const r3 = ((index * 23 + month * 31) % 983) / 983

    // 工作日倾向
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const workdayBias = isWeekend ? 0.4 : 0.8

    // 月份活跃度
    const monthActivity = [
      0.6,
      0.7,
      0.9,
      0.8,
      0.7,
      0.5,
      0.4,
      0.6,
      0.9,
      0.8,
      0.6,
      0.5
    ][month]

    const combinedProb = ((r1 + r2 + r3) / 3) * workdayBias * monthActivity

    // 减少空白率并增加不规律性
    const randomVariation = r1 + r2 * 0.5 + r3 * 0.3
    let emptyChance = 0.08 // 基础空白率降到8%

    // 动态调整空白概率，让分布更不规律
    emptyChance *= 0.3 + randomVariation * 1.4

    if (isWeekend) {
      emptyChance *= 2.0 // 周末稍微增加但不过分
    }
    if (month === 11 || month === 0) {
      emptyChance *= 1.5 + randomVariation * 0.8 // 假期有变化
    }

    // 添加活跃连续性
    const continuityFactor = Math.sin(index * 0.15) * 0.4 + 0.6
    emptyChance *= continuityFactor

    if (combinedProb < emptyChance * 0.4) {
      return { date: day, value: 0 }
    }

    // 更平衡的数值分布
    const adjustedProb = combinedProb + randomVariation * 0.15
    let value: number
    if (adjustedProb < 0.4) {
      value = Math.floor(r1 * 6) + 1 // 1-6
    }
    else if (adjustedProb < 0.75) {
      value = Math.floor(r2 * 15) + 3 // 3-17
    }
    else {
      value = Math.floor(r3 * 30) + 10 // 10-39
    }

    return { date: day, value }
  })
}

const data = ref(generateData())

// 不同的颜色主题
const themes = [
  {
    name: 'GitHub 绿色（默认）',
    colors: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
  },
  {
    name: '蓝色主题',
    colors: ['#ebedf0', '#c0e7ff', '#73b3ff', '#0969da', '#0550ae']
  },
  {
    name: '橙色主题',
    colors: ['#ebedf0', '#fed7aa', '#fb923c', '#ea580c', '#c2410c']
  },
  {
    name: '紫色主题',
    colors: ['#ebedf0', '#e9d5ff', '#c084fc', '#9333ea', '#7c3aed']
  },
  {
    name: '红色主题',
    colors: ['#ebedf0', '#fecaca', '#f87171', '#dc2626', '#b91c1c']
  }
]
</script>

<template>
  <n-space vertical size="large">
    <div v-for="theme in themes" :key="theme.name">
      <n-divider title-placement="left">
        {{ theme.name }}
      </n-divider>
      <n-heatmap :data="data" unit="commits" :colors="theme.colors" />
    </div>
  </n-space>
</template>
