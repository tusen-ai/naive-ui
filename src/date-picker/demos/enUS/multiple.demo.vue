<markdown>
# multiple
</markdown>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="timestamp1"
      type="date"
      multiple
      :shortcuts="shortcuts"
    />
    <n-date-picker
      v-model:value="timestamp2"
      type="date"
      multiple
      :shortcuts="shortcuts"
      :max-tag-count="4"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp1: ref([1660299411358]),
      timestamp2: ref([1660299411358]),
      shortcuts: {
        'Honey birthday': 1631203200000,
        Yesterday: () => new Date().getTime() - 24 * 60 * 60 * 1000
      }
    }
  }
})
</script>
