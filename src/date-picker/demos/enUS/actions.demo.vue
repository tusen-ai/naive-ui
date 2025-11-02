<markdown>
# Actions
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const ts1 = ref(null)
const ts2 = ref(1183135260000)
const range1 = ref(null)
const range2 = ref(null)
</script>

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
