<markdown>
# 一大堆数据

如果你有一大堆数据，你可能想让它快一点。设定 `virtual-scroll` 来使用一个飞快的穿梭框（会关掉那个傻乎乎的动画）。
</markdown>

<template>
  <n-legacy-transfer
    ref="transfer"
    v-model:value="value"
    :options="options"
    virtual-scroll
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 42000 }).map((v, i) => ({
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
