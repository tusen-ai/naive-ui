<markdown>
# Shortcuts

You can customize some shorcut buttons.
</markdown>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="ts1" type="date" :shortcuts="shortcuts" />
    <n-date-picker v-model:value="ts2" type="datetime" :shortcuts="shortcuts" />
    <n-date-picker
      v-model:value="range1"
      type="daterange"
      :shortcuts="rangeShortcuts"
    />
    <n-date-picker
      v-model:value="range2"
      type="datetimerange"
      :shortcuts="rangeShortcuts"
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
      range2: ref(null),
      shortcuts: {
        'Honey birthday': 1631203200000,
        Yesterday: () => new Date().getTime() - 24 * 60 * 60 * 1000
      },
      rangeShortcuts: {
        'Happy holiday': { from: 1629216000000, to: 1631203200000 } as const,
        'Last 2 hours': () => {
          const cur = new Date().getTime()
          return { from: cur - 2 * 60 * 60 * 1000, to: cur } as const
        }
      }
    }
  }
})
</script>
