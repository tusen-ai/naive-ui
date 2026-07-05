<markdown>
# 自定义 PageSizes 选项
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const pageSizes = [
  {
    label: '10 每页',
    value: 10
  },
  {
    label: '20 每页',
    value: 20
  },
  {
    label: '30 每页',
    value: 30
  },
  {
    label: '40 每页',
    value: 40
  }
]

const page = ref(2)
const pageSize = ref(20)
</script>

<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="pageSizes"
  />
</template>
