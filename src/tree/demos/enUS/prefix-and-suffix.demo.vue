<markdown>
# Prefix and suffix

Add some actions.
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
    return 'Out of Tao, One is born'
  if (level === 3)
    return 'Out of One, Two'
  if (level === 2)
    return 'Out of Two, Three'
  if (level === 1)
    return 'Out of Three, the created universe'
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
