<markdown>
# Date Cell

Use the `date-cell` slot to customize the content of the date cell. This demo marks the 10th of every month as payday.
</markdown>

<script setup lang="ts">
function isSalaryDate(date: number) {
  return date === 10
}
</script>

<template>
  <n-space vertical>
    <n-date-picker type="date" :default-value="Date.now()">
      <template #date-cell="{ date }">
        <div class="date-cell">
          <span>{{ date }}</span>
          <span v-if="isSalaryDate(date)" class="salary-dot" />
        </div>
      </template>
    </n-date-picker>
    <n-date-picker
      type="daterange"
      :default-value="[Date.now(), Date.now() + 86400000 * 7]"
    >
      <template #date-cell="{ date }">
        <div class="date-cell">
          <span>{{ date }}</span>
          <span v-if="isSalaryDate(date)" class="salary-dot" />
        </div>
      </template>
    </n-date-picker>
  </n-space>
</template>

<style>
.date-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.salary-dot {
  width: 4px;
  height: 4px;
  margin-top: 2px;
  border-radius: 50%;
  background-color: #999999;
}
</style>
