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
  let yearSeed: number

  if (range === 'recent') {
    end = new Date()
    start = subYears(end, 1)
    yearSeed = new Date().getFullYear()
  }
  else {
    const year = Number(range)
    start = startOfYear(new Date(year, 0, 1))
    end = endOfYear(new Date(year, 11, 31))
    yearSeed = year
  }

  const allDays = eachDayOfInterval({ start, end })

  return allDays.map((day, index) => {
    // 创建更复杂的随机模式，模拟真实的GitHub贡献图
    const dayOfWeek = day.getDay() // 0=周日, 1=周一...
    const month = day.getMonth() // 0-11

    // 基础随机种子
    const baseRandom = ((index * 7 + yearSeed * 13) % 997) / 997
    const secondRandom
      = ((index * 11 + yearSeed * 17 + day.getDate()) % 991) / 991
    const thirdRandom = ((index * 23 + month * 31) % 983) / 983

    // 工作日vs周末的倾向（工作日更活跃）
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const activityBias = isWeekend ? 0.3 : 0.7

    // 月份倾向（模拟不同月份的活跃度）
    const monthlyBias = [
      0.5,
      0.6,
      0.8,
      0.9,
      0.7,
      0.4,
      0.3,
      0.5,
      0.9,
      0.8,
      0.6,
      0.4
    ][month]

    // 年份特色调整
    let yearBias = 0.5
    if (yearSeed === 2025) {
      yearBias = 0.8 // 2025: 很活跃
    }
    else if (yearSeed === 2024) {
      yearBias = 0.4 // 2024: 较平淡
    }
    else if (yearSeed === 2023) {
      yearBias = 0.6 // 2023: 中等
    }
    else if (yearSeed === 2022) {
      yearBias = 0.7 // 2022: 活跃
    }

    // 组合所有因素
    const combinedRandom = (baseRandom + secondRandom + thirdRandom) / 3
    const finalProbability
      = combinedRandom * activityBias * monthlyBias * yearBias

    // 更不规律的空白分布 - 减少空白率且增加随机性
    let zeroThreshold = 0.12 // 基础空白率降到12%

    // 添加随机波动，让空白分布更不规律
    const randomFactor = baseRandom + secondRandom * 0.3 + thirdRandom * 0.7
    zeroThreshold *= 0.5 + randomFactor * 1.0 // 动态调整空白阈值

    // 周末稍微增加空白概率，但不要太多
    if (isWeekend) {
      zeroThreshold *= 1.8 // 周末空白率稍高但不会太明显
    }

    // 假期月份增加一些空白，但保持随机性
    if (month === 11 || month === 0) {
      zeroThreshold *= 1.2 + randomFactor * 0.8 // 假期空白率有变化
    }

    // 添加"连续活跃期"效果 - 如果前几天活跃，今天更可能活跃
    const streakFactor = Math.sin(index * 0.1 + yearSeed) * 0.3 + 0.7
    zeroThreshold *= streakFactor

    if (finalProbability < zeroThreshold * 0.3) {
      // 进一步降低实际空白概率
      return { date: day, value: 0 }
    }

    // 生成更自然且有层次的数值分布
    let value: number
    const intensity = finalProbability + randomFactor * 0.2 // 增加一些随机强度变化

    if (intensity < 0.3) {
      // 低活跃度 (1-4) - 大多数普通日子
      value = Math.floor(baseRandom * 4) + 1
    }
    else if (intensity < 0.6) {
      // 中等活跃度 (2-12) - 正常工作日
      value = Math.floor(secondRandom * 11) + 2
    }
    else if (intensity < 0.85) {
      // 高活跃度 (6-25) - 忙碌的日子
      value = Math.floor(thirdRandom * 20) + 6
    }
    else {
      // 超高活跃度 (15-50) - 特别忙碌的日子
      value = Math.floor(combinedRandom * 36) + 15
    }

    // 根据年份调整活跃度范围，保持差异但不过分
    const yearMultiplier
      = yearSeed === 2025
        ? 1.2
        : yearSeed === 2024
          ? 0.8
          : yearSeed === 2022
            ? 1.1
            : 0.95
    value = Math.floor(value * yearMultiplier)

    return { date: day, value: Math.max(1, value) }
  })
}

const yearData = computed(() => {
  const data = generateData(value.value)
  // 调试信息
  const stats = {
    total: data.length,
    zeros: data.filter(d => d.value === 0).length,
    nonZeros: data.filter(d => d.value > 0).length,
    maxValue: Math.max(...data.map(d => d.value)),
    sampleValues: data.slice(0, 10).map(d => d.value)
  }
  console.log(`年份 ${value.value} 数据统计:`, stats)
  return data
})

// 数据统计信息
const dataStats = computed(() => {
  const data = yearData.value
  const total = data.length
  const zeros = data.filter(d => d.value === 0).length
  const maxValue = Math.max(...data.map(d => d.value))
  const avgValue
    = Math.round((data.reduce((sum, d) => sum + d.value, 0) / total) * 100) / 100

  return {
    total,
    zeros,
    maxValue,
    avgValue,
    zeroPercent: Math.round((zeros / total) * 100)
  }
})

// 自定义颜色配置
const customColors = ['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
const blueColors = ['#ebedf0', '#c0e7ff', '#73b3ff', '#0969da', '#0550ae']
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

    <!-- 数据统计信息 -->
    <n-alert type="success" title="数据统计">
      <n-space>
        <n-tag round type="info">
          总天数: {{ dataStats.total }}
        </n-tag>
        <n-tag round type="warning">
          空白天: {{ dataStats.zeros }} ({{ dataStats.zeroPercent }}%)
        </n-tag>
        <n-tag round type="success">
          最大值: {{ dataStats.maxValue }}
        </n-tag>
        <n-tag round type="primary">
          平均值: {{ dataStats.avgValue }}
        </n-tag>
      </n-space>
    </n-alert>

    <n-divider title-placement="left">
      默认 GitHub 绿色风格
    </n-divider>
    <n-heatmap :key="`heatmap-1-${value}`" :data="yearData" unit="activities" />

    <n-divider title-placement="left">
      自定义绿色风格
    </n-divider>
    <n-heatmap
      :key="`heatmap-2-${value}`"
      :data="yearData"
      unit="activities"
      :colors="customColors"
    />

    <n-divider title-placement="left">
      蓝色风格
    </n-divider>
    <n-heatmap
      :key="`heatmap-3-${value}`"
      :data="yearData"
      unit="activities"
      :colors="blueColors"
    />
  </n-space>
</template>
