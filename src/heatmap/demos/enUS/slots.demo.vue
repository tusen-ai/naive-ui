<markdown>
# Slots

Customize footer area with `footer` slot and `indicator` slot. Also supports custom `tooltip` content and indicator text slots.
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'

const yearData = heatmapMockData()
</script>

<template>
  <n-flex vertical>
    <n-scrollbar x-scrollable style="max-width: 100%">
      <n-heatmap :data="yearData" :show-color-indicator="false">
        <template #footer>
          <n-text depth="3">
            Left footer slot
          </n-text>
        </template>
        <template #indicator>
          <n-text depth="3">
            Right indicator slot
          </n-text>
        </template>
        <template #tooltip="{ timestamp: date, value: tooltipValue }">
          <div>
            <div>
              <strong>Date:</strong> {{ new Date(date).toLocaleDateString() }}
            </div>
            <div><strong>Value:</strong> {{ tooltipValue ?? 0 }}</div>
            <div v-if="tooltipValue != null && tooltipValue > 5">
              <n-tag type="success" size="small">
                High Activity
              </n-tag>
            </div>
          </div>
        </template>
      </n-heatmap>
    </n-scrollbar>
    <n-divider />
    <h4>Custom Indicator Text</h4>
    <n-scrollbar x-scrollable style="max-width: 100%">
      <n-heatmap :data="yearData">
        <template #indicator-leading-text>
          <n-text depth="3" style="font-style: italic">
            Less
          </n-text>
        </template>
        <template #indicator-trailing-text>
          <n-text depth="3" style="font-style: italic">
            More
          </n-text>
        </template>
      </n-heatmap>
    </n-scrollbar>
    <n-divider />
    <h4>Custom Tooltip Configuration</h4>
    <n-scrollbar x-scrollable style="max-width: 100%">
      <n-heatmap
        :data="yearData"
        unit="activities"
        :tooltip="{ placement: 'bottom', delay: 500 }"
      >
        <template #footer>
          <n-text depth="3">
            Tooltip shown at bottom with 500ms delay
          </n-text>
        </template>
        <template #tooltip="{ timestamp: date, value: tooltipValue }">
          Activity Details<br>
          <div>{{ new Date(date).toLocaleDateString() }}</div>
          <div>{{ tooltipValue ?? 0 }}</div>
        </template>
      </n-heatmap>
    </n-scrollbar>
  </n-flex>
</template>
