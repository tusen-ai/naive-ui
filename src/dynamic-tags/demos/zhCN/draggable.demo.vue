<markdown>
# draggable
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref([
  '复盘',
  '赋能',
  '抓手',
  '对标',
  '对齐',
  '拉通',
  '倒逼',
  '颗粒度',
  '强化心智'
])
</script>

<template>
  <n-space>
    <n-dynamic-tags v-model:value="tags" draggable />
  </n-space>
</template>
