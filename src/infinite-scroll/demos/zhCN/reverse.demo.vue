<markdown>
# 反向
</markdown>

<script setup lang="ts">
import { ref } from 'vue'

const dataRef = ref<number[]>([])
const loading = ref(false)
async function handleLoad() {
  loading.value = true
  try {
    const data = await loadData()
    dataRef.value.unshift(...data)
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
    .reverse()
  return new Promise(resolve => setTimeout(() => resolve(result), 1000))
}
</script>

<template>
  <n-infinite-scroll
    style="height: 240px"
    reverse
    :distance="100"
    @load="handleLoad"
  >
    <div v-if="loading" class="text">
      loading...
    </div>
    <div v-for="i in dataRef" :key="i" class="item">
      {{ i }}
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
