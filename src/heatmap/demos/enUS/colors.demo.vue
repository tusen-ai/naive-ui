<markdown>
# Custom Colors

Each color has its own temperature.
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'
import { ref } from 'vue'

const data = heatmapMockData()

const customActiveColors = ref(['#9be9a8', '#40c463', '#30a14e', '#216e39'])

const minimumColor = ref('#ebedf0')

const colorLabels = ['Low', 'Medium', 'High', 'Very High']
</script>

<template>
  <n-flex justify="space-around">
    <div>
      <n-flex vertical align="center">
        <span>Minimum Color</span>
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
      unit="commits"
      :active-colors="customActiveColors"
      :minimum-color="minimumColor"
    />
  </n-scrollbar>
</template>
