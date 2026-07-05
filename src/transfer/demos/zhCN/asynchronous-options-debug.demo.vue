<markdown>
# 异步options报错debug
</markdown>

<script lang="ts" setup>
import type { TransferOption } from 'naive-ui'
import { ref } from 'vue'

const values = ref([1])
const options = ref<TransferOption[]>([])
function getOptions() {
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
</script>

<template>
  <NTransfer v-model:value="values" :options="options" source-filterable />
</template>
