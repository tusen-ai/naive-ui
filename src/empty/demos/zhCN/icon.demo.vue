<markdown>
# 图标

自定义图标。
</markdown>

<script lang="ts" setup>
import { IosAirplane } from '@vicons/ionicons4'
</script>

<template>
  <n-empty description="是一个飞机">
    <template #icon>
      <n-icon>
        <IosAirplane />
      </n-icon>
    </template>
    <template #extra>
      <n-button size="small">
        看看别的
      </n-button>
    </template>
  </n-empty>
</template>
