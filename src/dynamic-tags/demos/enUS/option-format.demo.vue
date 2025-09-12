<markdown>
# Use object formatted value

You can use `@create` to produce `{ label, value }` formatted value. Don't mess it up with `string` typed value.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([
  {
    label: 'Dig It',
    value: 'hello world 1'
  },
  { label: 'Maggie Mae', value: 'hello world 2' },
  {
    label: 'I Me Mine',
    value: 'hello world 3'
  },
  {
    label: 'I\'ve Got a Feeling',
    value: 'hello world 4'
  }
])

function onCreate(label: string) {
  return {
    label,
    value: `v${label}`
  }
}
</script>

<template>
  <n-dynamic-tags v-model:value="value" @create="onCreate" />
</template>
