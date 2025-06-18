<markdown>
# Disabled
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(null)
const date = ref(null)
const datetimerange = ref(null)
const daterange = ref(null)
const disabled = ref(true)
</script>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="date" type="date" :disabled="disabled" />
    <n-date-picker
      v-model:value="datetime"
      type="datetime"
      :disabled="disabled"
    />
    <n-date-picker
      v-model:value="daterange"
      :disabled="disabled"
      type="daterange"
    />
    <n-date-picker
      v-model:value="datetimerange"
      :disabled="disabled"
      type="datetimerange"
    />
    <n-switch v-model:value="disabled" />
  </n-space>
</template>
