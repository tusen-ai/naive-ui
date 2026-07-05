<markdown>
  # Close panel on select year or month

  By using the `fast-year-select` and `fast-month-select` properties, you can implement the closing of the year and month panel after selecting the year or month.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      timestamp: ref(1183135260000),
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>

<template>
  <NFlex vertical>
    <n-date-picker
      v-model:value="timestamp"
      type="date"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="timestamp"
      type="datetime"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="range"
      type="daterange"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="range"
      type="datetimerange"
      fast-year-select
      fast-month-select
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </NFlex>
</template>
