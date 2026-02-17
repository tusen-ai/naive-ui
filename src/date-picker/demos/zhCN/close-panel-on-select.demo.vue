<markdown>
  # 当选择年、月后，关闭年月面板
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
      <div>选择年份后，关闭面板</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-year
      />
      <n-date-picker
        v-model:value="timestamp"
        type="datetime"
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
      <div>选择月份后，关闭面板</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-month
      />
      <n-date-picker
        v-model:value="timestamp"
        type="datetime"
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
      <div>选择年份或月份后，关闭面板</div>
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        close-panel-on-select-date
      />
      <n-date-picker
        v-model:value="timestamp"
        type="datetime"
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
