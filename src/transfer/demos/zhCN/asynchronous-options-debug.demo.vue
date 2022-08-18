<markdown>
# 异步options报错debug
</markdown>

<template>
  <NTransfer v-model:value="values" :options="options" source-filterable />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Option } from '../../src/interface'

export default defineComponent({
  setup () {
    const values = ref([1])
    const options = ref<Option[]>([])
    const getOptions = () => {
      setTimeout(() => {
        options.value = [
          {
            label: 'Option1',
            value: 1
          },
          {
            label: 'Option2',
            value: 2
          },
          {
            label: 'Option3',
            value: 3
          }
        ]
      }, 1000)
    }
    getOptions()
    return {
      options,
      values
    }
  }
})
</script>
