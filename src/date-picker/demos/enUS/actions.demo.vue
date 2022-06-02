<markdown>
# Actions
</markdown>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="ts1" type="date" :actions="['now']" />
    <n-date-picker v-model:value="ts2" type="datetime" :actions="['now']" />
    <n-date-picker
      v-model:value="range1"
      update-value-on-close
      type="daterange"
      :actions="null"
    />
    <n-date-picker
      v-model:value="range2"
      update-value-on-close
      type="datetimerange"
      :actions="['clear']"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ts1: ref(null),
      ts2: ref(1183135260000),
      range1: ref(null),
      range2: ref(null)
    }
  }
})
</script>
