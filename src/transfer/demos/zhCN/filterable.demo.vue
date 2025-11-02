<markdown>
# 可过滤
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function createOptions() {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: `Option ${i}`,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues() {
  return Array.from({ length: 50 }).map((v, i) => i)
}

const options1 = createOptions()
const value1 = ref(createValues())
const options2 = createOptions()
const value2 = ref(createValues())
</script>

<template>
  <n-space vertical>
    <n-transfer
      v-model:value="value1"
      virtual-scroll
      :options="options1"
      source-filterable
    />
    <n-transfer
      v-model:value="value2"
      virtual-scroll
      :options="options2"
      target-filterable
    />
  </n-space>
</template>
