<markdown>
# Lots of options

1000 times the answer to everything.
</markdown>

<script lang="ts">
import { repeat } from 'seemly'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
      values: ref(null),
      options: repeat(42000, undefined).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" />
    <n-select v-model:value="values" multiple :options="options" />
  </n-space>
</template>
