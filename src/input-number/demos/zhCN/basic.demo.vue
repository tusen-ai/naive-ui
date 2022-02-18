<markdown>
# 基础用法
</markdown>

<template>
  <n-input-number v-model:value="value" clearable />
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
