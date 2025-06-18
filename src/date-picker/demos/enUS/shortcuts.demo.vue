<markdown>
# Shortcuts

You can customize some shorcut buttons.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const ts1 = ref(null)
const ts2 = ref(1183135260000)
const range1 = ref(null)
const range2 = ref(null)
const shortcuts = {
  'Honey birthday': 1631203200000,
  Yesterday: () => new Date().getTime() - 24 * 60 * 60 * 1000
}
const rangeShortcuts = {
  'Happy holiday': [1629216000000, 1631203200000] as const,
  'Last 2 hours': () => {
    const cur = new Date().getTime()
    return [cur - 2 * 60 * 60 * 1000, cur] as const
  }
}
</script>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="ts1" type="date" :shortcuts="shortcuts" />
    <n-date-picker v-model:value="ts2" type="datetime" :shortcuts="shortcuts" />
    <n-date-picker
      v-model:value="range1"
      type="daterange"
      :shortcuts="rangeShortcuts"
    />
    <n-date-picker
      v-model:value="range2"
      type="datetimerange"
      :shortcuts="rangeShortcuts"
    />
  </n-space>
</template>
