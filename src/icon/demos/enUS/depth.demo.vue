<markdown>
# Depth

To match different text color levels, icon provides a `depth` property.
</markdown>

<script lang="ts" setup>
import { CashOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-icon :component="CashOutline" size="40" :depth="1" />
  <n-icon :component="CashOutline" size="40" :depth="2" />
  <n-icon :component="CashOutline" size="40" :depth="3" />
  <n-icon :component="CashOutline" size="40" :depth="4" />
  <n-icon :component="CashOutline" size="40" :depth="5" />
</template>
