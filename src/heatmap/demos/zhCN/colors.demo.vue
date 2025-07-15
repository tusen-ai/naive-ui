<markdown>
# 自定义颜色

每一种颜色都有它的温度。
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'

const data = heatmapMockData()

const customColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']

const colorLabels = ['空白', '低活跃', '中活跃', '高活跃', '极高活跃']
</script>

<template>
  <n-flex justify="space-around">
    <div v-for="(_, index) in customColors" :key="index">
      <n-flex vertical align="center">
        <span>{{ colorLabels[index] }}</span>
        <n-color-picker
          v-model:value="customColors[index]"
          :show-alpha="false"
          size="small"
          :modes="['hex']"
          style="width: 100px"
        />
      </n-flex>
    </div>
  </n-flex>
  <n-divider />
  <n-heatmap :data="data" :colors="customColors" />
</template>
