<markdown>
# 文本按钮

长得就像文本。
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
    那车头依然吐着烟
  </n-button>
</template>
