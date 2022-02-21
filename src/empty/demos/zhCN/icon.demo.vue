<markdown>
# 图标

自定义图标。
</markdown>

<template>
  <n-empty description="是一个飞机">
    <template #icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    <template #extra>
      <n-button size="small">
        看看别的
      </n-button>
    </template>
  </n-empty>
</template>

<script lang="ts">
import { IosAirplane } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IosAirplane
  }
})
</script>
