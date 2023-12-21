<markdown>
# Month

You can set the display type of month in the panel.
</markdown>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="timestamp" type="month" clearable />
    <n-date-picker
      v-model:value="timestamp"
      type="month"
      :month-string-type="'short'"
      clearable
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(1183135260000)
    }
  }
})
</script>
