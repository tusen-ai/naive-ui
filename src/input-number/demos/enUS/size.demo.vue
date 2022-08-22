<markdown>
# Size
</markdown>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" size="tiny" />
    <n-input-number v-model:value="value" size="small" />
    <n-input-number v-model:value="value" size="medium" />
    <n-input-number v-model:value="value" size="large" />
  </n-space>
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
