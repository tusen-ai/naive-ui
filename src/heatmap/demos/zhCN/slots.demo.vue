<markdown>
# 插槽用法

自定义 footer 区域，支持 info 信息插槽和 indicator 指示器插槽。同时支持自定义 tooltip 内容。
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'

const yearData = heatmapMockData()
</script>

<template>
  <n-flex vertical>
    <n-heatmap :data="yearData" :show-color-indicator="false">
      <template #info>
        <n-text depth="3">
          左侧信息插槽
        </n-text>
      </template>
      <template #indicator>
        <n-text depth="3">
          右侧指示器插槽
        </n-text>
      </template>
      <template #tooltip="{ timestamp: date, value: tooltipValue, unit }">
        <div>
          <div>
            <strong>日期:</strong> {{ new Date(date).toLocaleDateString() }}
          </div>
          <div><strong>数值:</strong> {{ tooltipValue ?? 0 }} {{ unit }}</div>
          <div v-if="tooltipValue != null && tooltipValue > 5">
            <n-tag type="success" size="small">
              高活跃度
            </n-tag>
          </div>
        </div>
      </template>
    </n-heatmap>
    <n-divider />
    <h4>自定义 Tooltip 配置</h4>
    <n-heatmap
      :data="yearData"
      unit="activities"
      :tooltip="{ placement: 'bottom', delay: 500 }"
    >
      <template #info>
        <n-text depth="3">
          底部显示 tooltip，延迟 500ms
        </n-text>
      </template>
      <template #tooltip="{ timestamp: date, value: tooltipValue }">
        活动详情<br>
        <div>{{ new Date(date).toLocaleDateString() }}</div>
        <div>{{ tooltipValue ?? 0 }}</div>
      </template>
    </n-heatmap>
  </n-flex>
</template>
