<markdown>
# 格式化弹出提示
</markdown>

<template>
  <n-slider
    :default-value="50"
    :step="10"
    :format-tooltip="(value) => `${value}%`"
  />
</template>
