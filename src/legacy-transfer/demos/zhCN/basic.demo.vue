<markdown>
# 基础用法

穿梭框的基础用法。如果你有一大堆数据，看下一个例子。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function createOptions() {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: `选项 ${i}`,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues() {
  return Array.from({ length: 50 }).map((v, i) => i)
}

const options = createOptions()
const value = ref(createValues())
</script>

<template>
  <n-legacy-transfer v-model:value="value" :options="options" />
</template>
