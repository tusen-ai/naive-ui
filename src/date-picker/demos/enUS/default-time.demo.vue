<markdown>
# Default time

You can set the default time of picked date.
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="datetime" clearable default-time="13:22:11" />
    <n-date-picker type="datetime" clearable default-time="16:00:00" />
    <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="['16:00:00', undefined]"
    />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="['13:22:11', '16:00:00']"
    />
  </n-space>
</template>
