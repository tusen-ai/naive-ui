<markdown>
# Use object formatted value

You can use `@create` to produce `{ label, value }` formatted value. Don't mess it up with `string` typed value.
</markdown>

<template>
  <n-dynamic-tags v-model:value="value" @create="onCreate" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref([
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
        label: "I've Got a Feeling",
        value: 'hello world 4'
      }
    ])
    return {
      onCreate: (label: string) => {
        return {
          label,
          value: 'v' + label
        }
      },
      value: valueRef
    }
  }
})
</script>
