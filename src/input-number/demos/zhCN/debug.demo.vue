<markdown>
# Debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function handleUpdateValue1(v: number | null) {
  console.log(v)
}

function handleUpdateValue2(v: number | null) {
  console.log(v)
}

const value1 = ref(null)
const value2 = ref(null)
</script>

<template>
  <n-input-number
    v-model:value="value1"
    placeholder="最小值"
    :min="-3"
    :max="5"
    loading
    @update:value="handleUpdateValue1"
  />
  {{ JSON.stringify(value1) }}
  <n-input-number v-model:value="value2" @update:value="handleUpdateValue2" />
  {{ JSON.stringify(value2) }}
</template>
