<markdown>
# 尺寸

太小太大好像都不怎么好看。
</markdown>

<template>
  <n-space vertical>
    <n-legacy-transfer
      ref="transfer"
      v-model:value="value"
      :options="options"
      size="small"
    />
    <n-legacy-transfer
      ref="transfer"
      v-model:value="value"
      :options="options"
      size="large"
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
      options: createOptions(),
      value: ref(createValues())
    }
  }
})
</script>
