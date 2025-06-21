<markdown>
# 格式化弹出提示
</markdown>

<script lang="ts" setup>
const formatTooltip = (value: number) => `${value}%`
</script>

<template>
  <n-slider :default-value="50" :step="10" :format-tooltip="formatTooltip" />
</template>
