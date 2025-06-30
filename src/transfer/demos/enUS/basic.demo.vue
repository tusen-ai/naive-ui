<markdown>
# Basic

Basic example of the Transfer component. If you have tons of data, see below for virtualized list.
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

const options = createOptions()
const value = ref([])
</script>

<template>
  <n-transfer v-model:value="value" :options="options" />
</template>
