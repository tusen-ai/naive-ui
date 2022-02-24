<markdown>
# Mark
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" range :marks="marks" :step="10" />
    <n-space>
      <n-input-number v-model:value="value[0]" size="small" />
      <n-input-number v-model:value="value[1]" size="small" />
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70]),
      marks: {
        34: 'Amazing',
        75: 'Good'
      }
    }
  }
})
</script>
