<markdown>
# Large data
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function createOptions() {
  return Array.from({ length: 42000 }).map((v, i) => ({
    label: `Option${i}`,
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
  <n-transfer v-model:value="value" :options="options" virtual-scroll />
</template>
