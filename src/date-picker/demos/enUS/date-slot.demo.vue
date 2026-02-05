<markdown>
# Custom Date Cell

Use the `date` slot to customize the content of date cells, such as adding lunar calendar dates or holidays.
</markdown>

<script setup lang="ts">
// Simple holiday mapping example (for demonstration only)
const holidays: Record<string, string> = {
  '2024-1-1': 'NY',
  '2024-12-25': 'Xmas',
  '2024-7-4': 'July 4'
}

function getHoliday(year: number, month: number, date: number) {
  const key = `${year}-${month + 1}-${date}`
  return holidays[key]
}
</script>

<template>
  <n-space vertical>
    <n-date-picker type="date" :default-value="Date.now()">
      <template #date="{ year, month, date }">
        <div style="display: flex; flex-direction: column; align-items: center">
          <span>{{ date }}</span>
          <span
            v-if="getHoliday(year, month, date)"
            style="font-size: 10px; color: #18a058"
          >
            {{ getHoliday(year, month, date) }}
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
            v-if="getHoliday(year, month, date)"
            style="font-size: 10px; color: #18a058"
          >
            {{ getHoliday(year, month, date) }}
          </span>
        </div>
      </template>
    </n-date-picker>
  </n-space>
</template>
