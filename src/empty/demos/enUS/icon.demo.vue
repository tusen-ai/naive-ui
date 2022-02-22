<markdown>
# Icon

Customize icon in empty.
</markdown>

<template>
  <n-empty description="Custom your icon">
    <template #icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    <template #extra>
      <n-button size="small">
        Find Something New
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
