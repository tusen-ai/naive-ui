<markdown>
# 格式化
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      time: ref(null)
    }
  }
})
</script>

<template>
  <n-time-picker v-model:value="time" format="h:mm a" />
</template>
