<markdown>
# 使用键值对预设
</markdown>

<template>
  <n-dynamic-input
    v-model:value="value"
    preset="pair"
    key-placeholder="环境变量名"
    value-placeholder="环境变量值"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([
        {
          key: '',
          value: ''
        }
      ])
    }
  }
})
</script>
