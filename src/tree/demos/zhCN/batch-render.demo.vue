<markdown>
# 批量渲染

如你所想，前缀、标签、后缀都可以批量渲染
</markdown>

<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-prefix="renderPrefix"
    :render-label="renderLabel"
    :render-suffix="renderSuffix"
    :selectable="false"
  />
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NButton, TreeOption } from 'naive-ui'
import { repeat } from 'seemly'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
      level
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

function renderPrefix ({ option }: { option: TreeOption }) {
  return h(
    NButton,
    { text: true, type: 'primary' },
    { default: () => `Prefix-${option.level}` }
  )
}

function renderLabel ({ option }: { option: TreeOption }) {
  return `${option.label} :)`
}

function renderSuffix ({ option }: { option: TreeOption }) {
  return h(
    NButton,
    { text: true, type: 'primary' },
    { default: () => `Suffix-${option.level}` }
  )
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      renderPrefix,
      renderLabel,
      renderSuffix
    }
  }
})
</script>
