<markdown>
# Range

Use `type="timerange"` to select a time range. When the end time is earlier than the start time, clicking confirm will automatically swap them.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-time-picker v-model:value="value" type="timerange" />
    <n-time-picker
      type="timerange"
      :default-value="[1183135260000, 1183155000000]"
    />
  </n-space>
</template>
