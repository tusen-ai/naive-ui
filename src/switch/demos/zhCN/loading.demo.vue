<markdown>
# 加载中
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
const loading = ref(false)
function handleUpdateValue(value: boolean) {
  loading.value = true
  setTimeout(() => {
    active.value = value
    loading.value = false
  }, 2000)
}
</script>

<template>
  <n-space>
    <n-switch :rubber-band="false" loading />
    <n-switch
      :rubber-band="false"
      :value="active"
      :loading="loading"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>
