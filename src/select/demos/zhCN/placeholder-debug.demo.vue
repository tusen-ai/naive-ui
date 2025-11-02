<markdown>
# Placehoder Debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    value: '1',
    label: '1'
  }
]
const value1 = ref(null)
const value2 = ref(null)
</script>

<template>
  <n-space vertical>
    <n-select
      v-model:value="value1"
      placeholder=""
      :options="options"
      style="width: 200px"
    />
    <n-select
      v-model:value="value2"
      multiple
      placeholder=""
      :options="options"
      style="width: 200px"
    />
  </n-space>
</template>
