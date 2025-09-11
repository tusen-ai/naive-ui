<markdown>
# Shortcuts Position

Control where the shortcut buttons appear using the `shortcuts-position` prop.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const dateLeft = ref<number | null>(null)
const dateBottom = ref<number | null>(null)
const rangeRight = ref<[number, number] | null>(null)

const shortcuts = {
  Yesterday: () => Date.now() - 24 * 60 * 60 * 1000,
  'Last 7 Days': () => Date.now() - 7 * 24 * 60 * 60 * 1000
}

const rangeShortcuts = {
  'This Month': () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    return [start, now.getTime()] as const
  },
  'Last 2 Hours': () => {
    const cur = Date.now()
    return [cur - 2 * 60 * 60 * 1000, cur] as const
  }
}
</script>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="dateLeft"
      type="date"
      :shortcuts="shortcuts"
      shortcuts-position="left"
    />
    <n-date-picker
      v-model:value="rangeRight"
      type="daterange"
      :shortcuts="rangeShortcuts"
      shortcuts-position="right"
    />
    <n-date-picker
      v-model:value="dateBottom"
      type="date"
      :shortcuts="shortcuts"
      shortcuts-position="bottom"
    />
  </n-space>
</template>
