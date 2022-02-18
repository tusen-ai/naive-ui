<markdown>
# 操作

</markdown>
<template>
  <n-space vertical>
    <n-time-picker v-model:value="ts1" :actions="['now']" />
    <n-time-picker v-model:value="ts2" :actions="null" />
  </n-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      ts1: ref(null),
      ts2: ref(861333934000)
    }
  }
})
</script>
