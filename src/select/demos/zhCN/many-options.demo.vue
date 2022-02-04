<markdown>
# 许多选项

1000 倍宇宙的终极答案个数的选项。
</markdown>

<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" />
    <n-select v-model:value="values" multiple :options="options" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      values: ref(null),
      options: repeat(42000, undefined).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
})
</script>
