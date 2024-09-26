<markdown>
# 自定义标签渲染

给标签一点颜色看看。
</markdown>

<script setup lang="ts">
import { h } from 'vue'
import type { CascaderOption, CascaderRenderTag } from 'naive-ui'
import { NTag } from 'naive-ui'

const tagTypes = ['success', 'warning', 'error'] as const
const renderTag: CascaderRenderTag = ({ option, handleClose }) => {
  const { level, label } = option
  return h(
    NTag,
    {
      type: tagTypes[(level as number) - 1],
      closable: (level as number) === 1,
      onClose: (e: MouseEvent) => {
        e.stopPropagation()
        handleClose()
      }
    },
    { default: () => label }
  )
}

const options = getOptions()

function getOptions(depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        level: iterator,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`)
      })
    }
    else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        level: iterator,
        disabled: i % 5 === 0
      })
    }
    else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        level: iterator,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}
</script>

<template>
  <n-cascader multiple clearable :render-tag="renderTag" :options="options" />
</template>
