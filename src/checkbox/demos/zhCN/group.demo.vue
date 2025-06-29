<markdown>
# 选项组
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const cities = ref(null)
</script>

<template>
  <n-checkbox-group v-model:value="cities">
    <n-space item-style="display: flex;">
      <n-checkbox value="Beijing" label="北京" />
      <n-checkbox value="Shanghai" label="上海" />
      <n-checkbox value="Guangzhou" label="广州" />
      <n-checkbox value="Shenzhen" label="深圳" />
    </n-space>
  </n-checkbox-group>
</template>
