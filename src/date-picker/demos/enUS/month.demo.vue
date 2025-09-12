<markdown>
# Month

Use `month-format` to format month item inside panel.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
</script>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="timestamp" type="month" clearable />
    <n-date-picker
      v-model:value="timestamp"
      type="month"
      format="y MMM"
      month-format="MMM"
      clearable
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </n-space>
</template>
