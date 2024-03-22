<markdown>
# After selected the year or month, close the panel.
</markdown>

<template>
  <n-space vertical>
    <span>After selected the year or month, close the panel.</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-year
      close-panel-on-select-month
      type="date"
    />
    <span>After selected the year, close the panel.</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-year
      type="datetime"
    />
    <span>After selected the month, close the panel.</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-month
      type="week"
      clearable
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>

    <span>After selected the year, close the panel.</span>
    <n-date-picker
      v-model:value="range"
      close-panel-on-select-year
      type="daterange"
    />
    <span>After selected the month, close the panel.</span>
    <n-date-picker
      v-model:value="range"
      close-panel-on-select-month
      type="datetimerange"
    />
    <pre>{{ JSON.stringify(range) }}</pre>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(1183135260000),
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>
