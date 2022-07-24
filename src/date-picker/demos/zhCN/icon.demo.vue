<markdown>
# 图标
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="date">
      <template #date-icon>
        <n-icon :size="16" :component="RocketOutline" />
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
import { TrendingUpSharp, RocketOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      TrendingUpSharp,
      RocketOutline
    }
  }
})
</script>
