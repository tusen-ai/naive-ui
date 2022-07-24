<markdown>
# 基础用法

穿梭框的基础用法。如果你有一大堆数据，看下一个例子。
</markdown>

<template>
  <n-legacy-transfer ref="transfer" v-model:value="value" :options="options" />
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
