<markdown>
# Text button

It just looks like text.
</markdown>

<script lang="ts" setup>
import { TrainOutline as TrainIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-button text>
    <template #icon>
      <n-icon>
        <TrainIcon />
      </n-icon>
    </template>
    The Engine is Still Spitting Smoke
  </n-button>
</template>
