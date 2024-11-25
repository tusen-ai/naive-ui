<markdown>
# Controlled manner
</markdown>

<script setup lang="ts">
import { NInputNumber, NSplit } from 'naive-ui'
import { ref } from 'vue'

const split = ref<number>(0.8)
</script>

<template>
  <n-flex vertical>
    <NInputNumber
      v-model:value="split"
      :step="0.1"
      clearable
      :max="1"
      :min="0"
    />
    <NSplit v-model:size="split" style="height: 200px">
      <template #1>
        <div style="width: 100%; background-color: black" />
      </template>
      <template #2>
        <div style="width: 100%; background-color: red" />
      </template>
    </NSplit>
  </n-flex>
</template>
