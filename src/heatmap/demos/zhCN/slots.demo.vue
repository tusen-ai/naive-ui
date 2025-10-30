<markdown>
# 插槽用法

自定义 footer 区域，支持 `footer` 插槽和 `indicator` 插槽。同时支持自定义 `tooltip` 内容，以及指示器文本插槽。
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
            左侧信息插槽
          </n-text>
        </template>
        <template #indicator>
          <n-text depth="3">
            右侧指示器插槽
          </n-text>
        </template>
        <template #tooltip="{ timestamp: date, value: tooltipValue }">
          <div>
            <div>
              <strong>日期:</strong> {{ new Date(date).toLocaleDateString() }}
            </div>
            <div><strong>数值:</strong> {{ tooltipValue ?? 0 }}</div>
            <div v-if="tooltipValue != null && tooltipValue > 5">
              <n-tag type="success" size="small">
                高活跃度
              </n-tag>
            </div>
          </div>
        </template>
      </n-heatmap>
    </n-scrollbar>
    <n-divider />
    <h4>自定义指示器文本</h4>
    <n-scrollbar x-scrollable style="max-width: 100%">
      <n-heatmap :data="yearData">
        <template #indicator-leading-text>
          <n-text depth="3" style="font-style: italic">
            较少
          </n-text>
        </template>
        <template #indicator-trailing-text>
          <n-text depth="3" style="font-style: italic">
            较多
          </n-text>
        </template>
      </n-heatmap>
    </n-scrollbar>
    <n-divider />
    <h4>自定义 Tooltip 配置</h4>
    <n-scrollbar x-scrollable style="max-width: 100%">
      <n-heatmap
        :data="yearData"
        unit="activities"
        :tooltip="{ placement: 'bottom', delay: 500 }"
      >
        <template #footer>
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
    </n-scrollbar>
  </n-flex>
</template>
