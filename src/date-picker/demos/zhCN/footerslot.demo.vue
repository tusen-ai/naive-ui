<markdown>
# 额外内容
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="date">
      <template #date-footer>
        extra footer
      </template>
      <template #month-footer>
        extra month footer
      </template>
    </n-date-picker>
    <n-date-picker type="datetime">
      <template #datetime-footer>
        extra footer
      </template>
    </n-date-picker>
    <n-date-picker type="daterange">
      <template #daterange-footer>
        extra footer
      </template>
    </n-date-picker>
    <n-date-picker type="datetimerange">
      <template #datetimerange-footer>
        extra footer
      </template>
    </n-date-picker>
  </n-space>
</template>
