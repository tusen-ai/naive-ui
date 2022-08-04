<markdown>
# Filterable
</markdown>

<template>
  <n-space vertical>
    <n-transfer
      ref="transfer"
      v-model:value="value1"
      virtual-scroll
      :options="options1"
      source-filterable
    />
    <n-transfer
      ref="transfer"
      v-model:value="value2"
      virtual-scroll
      :options="options2"
      target-filterable
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.from({ length: 50 }).map((v, i) => i)
}

export default defineComponent({
  setup () {
    return {
      options1: createOptions(),
      value1: ref(createValues()),
      options2: createOptions(),
      value2: ref(createValues())
    }
  }
})
</script>
