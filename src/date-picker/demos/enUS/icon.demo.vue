<markdown>
# Icon
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="date">
      <template #date-icon>
        <n-icon :size="16" :component="AccessibilityOutline" />
      </template>
    </n-date-picker>
    <n-date-picker type="daterange">
      <template #date-icon>
        <n-icon :size="16" :component="AccessibilityOutline" />
      </template>
      <template #to-icon>
        <n-icon :size="16" :component="AirplaneOutline" />
      </template>
    </n-date-picker>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AccessibilityOutline, AirplaneOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      AccessibilityOutline,
      AirplaneOutline
    }
  }
})
</script>
