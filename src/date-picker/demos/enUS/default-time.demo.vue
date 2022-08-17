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
      :default-time="{ from: '16:00:00', to: undefined }"
    />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="{ from: '13:22:11', to: '16:00:00' }"
    />
  </n-space>
</template>
