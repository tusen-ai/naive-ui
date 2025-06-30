<markdown>
# 图标

默认插槽的内容会被用作图标。
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-rate>
    <n-icon size="20">
      <CashIcon />
    </n-icon>
  </n-rate>
</template>
