<markdown>
# 插槽用法

自定义 footer 区域，支持 info 信息插槽和 indicator 指示器插槽。
</markdown>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateHeatmapData } from '../../src/utils'

const value = ref<'recent' | number>('recent')
const yearData = computed(() => {
  return generateHeatmapData(value.value)
})
</script>

<template>
  <n-flex vertical>
    <n-heatmap :data="yearData" unit="activities" :show-color-indicator="false">
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
    </n-heatmap>
  </n-flex>
</template>
