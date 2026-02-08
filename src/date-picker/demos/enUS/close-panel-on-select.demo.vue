<markdown>
  # Close panel after selecting year or month.
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
  <NSpace vertical>
    <div>
      <div>Close panel after selecting year.</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-year
      />
      <n-date-picker
        v-model:value="range"
        type="daterange"
        close-panel-on-select-year
      />
      <n-date-picker
        v-model:value="range"
        type="datetimerange"
        close-panel-on-select-year
      />
      <pre>{{ JSON.stringify(timestamp) }}</pre>
    </div>

    <div>
      <div>Close panel after selecting month.</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-month
      />
      <n-date-picker
        v-model:value="range"
        type="daterange"
        close-panel-on-select-month
      />
      <n-date-picker
        v-model:value="range"
        type="datetimerange"
        close-panel-on-select-month
      />
      <pre>{{ JSON.stringify(timestamp) }}</pre>
    </div>

    <div>
      <div>Close panel after selecting year or month.</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-date
      />
      <n-date-picker
        v-model:value="range"
        type="daterange"
        close-panel-on-select-date
      />
      <n-date-picker
        v-model:value="range"
        type="datetimerange"
        close-panel-on-select-date
      />
      <pre>{{ JSON.stringify(timestamp) }}</pre>
    </div>
  </NSpace>
</template>
