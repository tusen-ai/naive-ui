<markdown>
# 日期单元格

使用 `date-cell` 插槽可以自定义日期单元格的内容，这里演示标记“每月 10 号”为发工资日期。
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
