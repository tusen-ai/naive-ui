<markdown>
# 自定义日期

使用 `date` 插槽可以自定义日期单元格的内容，例如添加农历、节日等信息。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    // 简单的农历映射示例（仅用于演示）
    const lunarDates: Record<string, string> = {
      '2024-1-1': '廿一',
      '2024-1-15': '初五',
      '2024-2-10': '初一',
      '2024-12-25': '圣诞'
    }

    const getLunarDate = (year: number, month: number, date: number) => {
      const key = `${year}-${month + 1}-${date}`
      return lunarDates[key]
    }

    return {
      getLunarDate
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-date-picker type="date" :default-value="Date.now()">
      <template #date="{ year, month, date }">
        <div style="display: flex; flex-direction: column; align-items: center">
          <span>{{ date }}</span>
          <span
            v-if="getLunarDate(year, month, date)"
            style="font-size: 10px; color: #999"
          >
            {{ getLunarDate(year, month, date) }}
          </span>
        </div>
      </template>
    </n-date-picker>
    <n-date-picker
      type="daterange"
      :default-value="[Date.now(), Date.now() + 86400000 * 7]"
    >
      <template #date="{ year, month, date }">
        <div style="display: flex; flex-direction: column; align-items: center">
          <span>{{ date }}</span>
          <span
            v-if="getLunarDate(year, month, date)"
            style="font-size: 10px; color: #999"
          >
            {{ getLunarDate(year, month, date) }}
          </span>
        </div>
      </template>
    </n-date-picker>
  </n-space>
</template>
