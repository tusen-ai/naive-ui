<markdown>
# 格式化
</markdown>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="timestamp"
      type="datetime"
      clearable
      :format="format"
    />
    <n-date-picker
      v-model:value="timestamp2"
      type="datetime"
      :format="format"
      clearable
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(null),
      timestamp2: ref(1183135260000),
      format: 'yyyy/MM/dd - HH:mm'
    }
  }
})
</script>
