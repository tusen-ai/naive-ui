<markdown>
# Separators

In `multiple` mode, set `separators`. When the input (or pasted text) contains a separator, it will be split immediately and Naive UI will try to select matching options (`tag` mode will create options).
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tagValue = ref<Array<string | number>>([])
const selectValue = ref<Array<string | number>>([])

const options = [
  { label: '123', value: 'xxx' },
  { label: '456', value: 'yyy' }
]
</script>

<template>
  <n-space vertical>
    <n-text>Type or paste: aa;bb;cc</n-text>
    <n-select
      v-model:value="tagValue"
      filterable
      tag
      multiple
      :separators="[';']"
      placeholder="Type or paste: aa;bb;cc"
      :show-arrow="false"
      :options="options"
    />
    <n-text>Type or paste: 123,456;</n-text>
    <n-select
      v-model:value="selectValue"
      multiple
      filterable
      :options="options"
      :separators="[';', ',']"
      placeholder="Type or paste: 123,456;"
    />
  </n-space>
</template>
