<markdown>
# 自定义颜色

每一种颜色都有它的温度。

通过 `active-colors` 和 `minimum-color` 属性自定义热力图的颜色。

`active-colors` 是一个颜色数组，按从浅到深的顺序排列，优先级高于内置主题。`minimum-color` 用于设置最小值的颜色。
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'
import { ref } from 'vue'

const data = heatmapMockData()

const customActiveColors = ref(['#9be9a8', '#40c463', '#30a14e', '#216e39'])

const minimumColor = ref('#ebedf0')

const colorLabels = ['低活跃', '中活跃', '高活跃', '极高活跃']
</script>

<template>
  <n-flex justify="space-around">
    <div>
      <n-flex vertical align="center">
        <span>最小颜色</span>
        <n-color-picker
          v-model:value="minimumColor"
          :show-alpha="false"
          size="small"
          :modes="['hex']"
          style="width: 100px"
        />
      </n-flex>
    </div>
    <div v-for="(_, index) in customActiveColors" :key="index">
      <n-flex vertical align="center">
        <span>{{ colorLabels[index] }}</span>
        <n-color-picker
          v-model:value="customActiveColors[index]"
          :show-alpha="false"
          size="small"
          :modes="['hex']"
          style="width: 100px"
        />
      </n-flex>
    </div>
  </n-flex>
  <n-divider />
  <n-scrollbar x-scrollable style="max-width: 100%">
    <n-heatmap
      :data="data"
      :active-colors="customActiveColors"
      :minimum-color="minimumColor"
    />
  </n-scrollbar>
</template>
