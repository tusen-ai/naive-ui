<markdown>
# Format
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(null)
const timestamp2 = ref(1183135260000)
const format = 'yyyy/MM/dd - HH:mm'
</script>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="timestamp"
      type="datetime"
      clearable
      :format="format"
    />
    <n-date-picker
      v-model:value="timestamp2"
      type="datetime"
      :format="format"
      clearable
    />
  </n-space>
</template>
