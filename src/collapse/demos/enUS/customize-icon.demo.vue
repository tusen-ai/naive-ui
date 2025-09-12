<markdown>
# Customize icon
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-collapse>
    <template #header-extra>
      <n-icon><CashIcon /></n-icon>
    </template>
    <template #arrow>
      <n-icon>
        <CashIcon />
      </n-icon>
    </template>
    <n-collapse-item title="Bronze" name="1">
      <div>good</div>
    </n-collapse-item>
    <n-collapse-item title="Silver" name="2">
      <div>nice</div>
    </n-collapse-item>
    <n-collapse-item title="Gold" name="3">
      <div>very good</div>
    </n-collapse-item>
  </n-collapse>
</template>
