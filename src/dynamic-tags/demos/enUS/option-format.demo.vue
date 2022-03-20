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
      { label: '你没见过不等于没有', value: 'hello world 1' },
      {
        label: '不要给自己设限',
        value: 'hello world 2'
      },
      {
        label: '不要说连升两级',
        value: 'hello world 3'
      },
      {
        label: '直接升到 CEO 都是有可能的',
        value: 'hello world 4'
      }
    ])
    return {
      onCreate: (label: string) => {
        return {
          label: label,
          value: 'v' + label
        }
      },
      value: valueRef
    }
  }
})
</script>
