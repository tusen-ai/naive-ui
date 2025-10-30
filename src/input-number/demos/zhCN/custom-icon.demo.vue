<markdown>
# 自定义图标
</markdown>

<script lang="ts" setup>
import { ArrowDownCircleOutline, ArrowUpCircleOutline } from '@vicons/ionicons5'
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value">
      <template #minus-icon>
        <n-icon :component="ArrowDownCircleOutline" />
      </template>
      <template #add-icon>
        <n-icon :component="ArrowUpCircleOutline" />
      </template>
    </n-input-number>
  </n-space>
</template>
