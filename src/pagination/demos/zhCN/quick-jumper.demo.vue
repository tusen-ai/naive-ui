<markdown>
# 快速跳跃

自定义跳至的内容（按 `Enter` 进行快速跳跃）。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
</script>

<template>
  <n-space vertical>
    <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
      <template #goto>
        请回答
      </template>
    </n-pagination>
    <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
      <template #goto>
        请回答
      </template>
    </n-pagination>
  </n-space>
</template>
