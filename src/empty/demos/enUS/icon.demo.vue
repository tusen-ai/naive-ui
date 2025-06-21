<markdown>
# Icon

Customize icon in empty.
</markdown>

<script lang="ts" setup>
import { IosAirplane } from '@vicons/ionicons4'
</script>

<template>
  <n-empty description="Custom your icon">
    <template #icon>
      <n-icon>
        <IosAirplane />
      </n-icon>
    </template>
    <template #extra>
      <n-button size="small">
        Find Something New
      </n-button>
    </template>
  </n-empty>
</template>
