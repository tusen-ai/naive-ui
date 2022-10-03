<markdown>
# Icon
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="date">
      <template #date-icon>
        <n-icon :size="16" :component="RocketOutline" />
      </template>
      <template #panel-prev-fast>
        <n-icon :size="16" :component="ChevronBackCircle" />
      </template>
      <template #panel-prev>
        <n-icon :size="16" :component="ChevronBackCircleOutline" />
      </template>
      <template #panel-next>
        <n-icon :size="16" :component="ChevronForwardCircleOutline" />
      </template>
      <template #panel-next-fast>
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
