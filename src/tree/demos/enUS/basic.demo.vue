<markdown>
# Basic

Fortunately, the tree is now alive and it's not balanced.
</markdown>

<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    expand-on-click
    checkable
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { TreeOption } from 'naive-ui'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
  return ''
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
</script>
