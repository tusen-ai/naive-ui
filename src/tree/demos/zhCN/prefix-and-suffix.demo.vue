<markdown>
# 前缀与后缀

放一些操作。
</markdown>

<script lang="ts">
import type { TreeOption } from 'naive-ui'
import { NButton } from 'naive-ui'
import { repeat } from 'seemly'
import { defineComponent, h, ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    const label = createLabel(level)
    return {
      label,
      key,
      children: createData(level - 1, key),
      suffix: () =>
        h(
          NButton,
          { text: true, type: 'primary' },
          { default: () => 'Suffix' }
        ),
      prefix: () =>
        h(NButton, { text: true, type: 'primary' }, { default: () => 'Prefix' })
    }
  })
}

function createLabel(level: number): string {
  if (level === 4)
    return '道生一'
  if (level === 3)
    return '一生二'
  if (level === 2)
    return '二生三'
  if (level === 1)
    return '三生万物'
  return ''
}

export default defineComponent({
  setup() {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
</script>

<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
  />
</template>
