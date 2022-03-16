<markdown>
# Use separators to separate tags input

set `tag` and `separators`to use as tag input with `separators`.
</markdown>

<template>
  <n-select
    v-model:value="multipleSelectValue"
    :options="options"
    filterable
    multiple
    tag
    placeholder="use ; or , as separators"
    :separators="separators"
    :show-arrow="false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const separators = [',', ';']
    return {
      separators,
      multipleSelectValue: ref(null),
      options: [
        { label: '123', value: '123' },
        { label: '124', value: '124' }
      ]
    }
  }
})
</script>
