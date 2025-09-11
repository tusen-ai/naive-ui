<markdown>
# Week

By default, the week picker will display week numbers. For example, `Week 26` will display as `26.`. You can control whether to show the week prefix via the `show-week-prefix` prop.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
const showWeekPrefix = ref(true)
</script>

<template>
  <n-flex vertical align="flex-start">
    <n-switch v-model:value="showWeekPrefix">
      <template #checked>
        <span>Show week prefix</span>
      </template>
      <template #unchecked>
        <span>Omit week prefix</span>
      </template>
    </n-switch>
    <n-date-picker
      v-model:value="timestamp"
      type="week"
      clearable
      :show-week-prefix="showWeekPrefix"
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </n-flex>
</template>
