<markdown>
# 间隔
</markdown>

<template>
  <n-input-number v-model:value="value" :step="2" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
