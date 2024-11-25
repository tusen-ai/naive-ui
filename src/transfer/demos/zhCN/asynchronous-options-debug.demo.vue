<markdown>
# 异步options报错debug
</markdown>

<script lang="ts">
import type { TransferOption } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const values = ref([1])
    const options = ref<TransferOption[]>([])
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

<template>
  <NTransfer v-model:value="values" :options="options" source-filterable />
</template>
