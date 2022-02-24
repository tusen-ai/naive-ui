<markdown>
# Basic
</markdown>

<template>
  <n-space>
    <n-switch v-model:value="active" />
    <n-switch v-model:value="active" disabled />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
</script>
