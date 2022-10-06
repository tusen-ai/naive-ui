<markdown>
# 图标
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="date">
      <template #date-icon>
        <n-icon :size="16" :component="RocketOutline" />
      </template>
      <template #prev-year>
        <n-icon :size="16" :component="ChevronBackCircle" />
      </template>
      <template #prev-month>
        <n-icon :size="16" :component="ChevronBackCircleOutline" />
      </template>
      <template #next-month>
        <n-icon :size="16" :component="ChevronForwardCircleOutline" />
      </template>
      <template #next-year>
        <n-icon :size="16" :component="ChevronForwardCircle" />
      </template>
    </n-date-picker>
    <n-date-picker type="daterange">
      <template #separator>
        <n-icon :size="16" :component="TrendingUpSharp" />
      </template>
      <template #date-icon>
        <n-icon :size="16" :component="RocketOutline" />
      </template>
    </n-date-picker>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  TrendingUpSharp,
  RocketOutline,
  ChevronBackCircle,
  ChevronBackCircleOutline,
  ChevronForwardCircle,
  ChevronForwardCircleOutline
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      TrendingUpSharp,
      RocketOutline,
      ChevronBackCircle,
      ChevronBackCircleOutline,
      ChevronForwardCircle,
      ChevronForwardCircleOutline
    }
  }
})
</script>
