<markdown>
# 受控的属性值
</markdown>

<template>
  <n-flex vertical>
    <n-input-number
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

<script setup lang="ts">
import { ref } from 'vue'
import { NSplit, NInputNumber } from 'naive-ui'

const split = ref<number>(0.8)
</script>
