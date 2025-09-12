<markdown>
# Tooltip
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-tooltip trigger="hover" placement="right">
    <template #trigger>
      <n-float-button position="relative">
        <n-icon>
          <CashIcon />
        </n-icon>
      </n-float-button>
    </template>
    Lpsum
  </n-tooltip>
</template>
