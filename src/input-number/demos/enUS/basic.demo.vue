<markdown>
# Basic
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(0)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" clearable />
    <n-tag type="success" size="small" round>
      Current Value: {{ JSON.stringify(value) }}
    </n-tag>
  </n-space>
</template>
