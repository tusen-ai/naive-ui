<markdown>
# Size

Mixing sizes does not look harmonious.
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

const options = createOptions()
const value = ref(createValues())
</script>

<template>
  <n-space vertical>
    <n-legacy-transfer v-model:value="value" :options="options" size="small" />
    <n-legacy-transfer v-model:value="value" :options="options" size="large" />
  </n-space>
</template>
