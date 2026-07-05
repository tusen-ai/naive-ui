<markdown>
# 每页条数
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
const pageSize = ref(20)
</script>

<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
  />
</template>
