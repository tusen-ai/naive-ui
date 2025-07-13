<markdown>
# Custom Colors

Each color has its own temperature.
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'
import { ref } from 'vue'

const data = ref(heatmapMockData())

const customColors = ref([
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39'
])

const colorLabels = ['Empty', 'Low', 'Medium', 'High', 'Very High']
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
  <n-heatmap :data="data" unit="commits" :colors="customColors" />
</template>
