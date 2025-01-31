<markdown>
# 基础
</markdown>

<script setup lang="ts">
import { ref } from 'vue'

const dataRef = ref<number[]>([])
const loading = ref(false)
async function handleLoad() {
  loading.value = true
  try {
    const data = await loadData()
    dataRef.value.push(...data)
  }
  finally {
    loading.value = false
  }
}
function loadData(): Promise<number[]> {
  const index = dataRef.value.length
  const result = Array.from({ length: 10 })
    .fill(null)
    .map((_, i) => index + i + 1)
  return new Promise(resolve => setTimeout(() => resolve(result), 1000))
}
</script>

<template>
  <n-infinite-scroll style="height: 240px" :distance="100" @load="handleLoad">
    <div v-for="i in dataRef" :key="i" class="item">
      {{ i }}
    </div>
    <div v-if="loading" class="text">
      loading...
    </div>
  </n-infinite-scroll>
</template>

<style>
.item {
  display: flex;
  align-items: center;
  height: 46px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgba(0, 128, 0, 0.16);
}
.item:last-child {
  margin-bottom: 0;
}
.text {
  text-align: center;
}
</style>
