<markdown>
# Trim

Trim the space at both ends.
</markdown>

<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" trim />
    <n-input v-model:value="value" type="textarea" trim />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
