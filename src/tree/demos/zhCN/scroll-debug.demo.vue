<markdown>
# Scroll debug
</markdown>

<script lang="ts" setup>
import type { TreeOption } from 'naive-ui'
import { NScrollbar, NTree } from 'naive-ui'

function createData(level = 10): TreeOption[] {
  if (!level)
    return []
  return [
    {
      label: 'foooooooooooooooooo',
      key: `node-${level}`,
      children: createData(level - 1)
    }
  ]
}

const data = createData()
</script>

<template>
  <div>
    <NScrollbar x-scrollable style="width: 100px; height: 150px">
      <NTree
        default-expand-all
        style="white-space: nowrap"
        block-line
        :data="data"
      />
    </NScrollbar>
    <NScrollbar x-scrollable style="width: 300px; height: 150px">
      <NTree
        default-expand-all
        style="white-space: nowrap"
        block-line
        :data="data"
      />
    </NScrollbar>
    <NTree default-expand-all style="" block-line :data="data" />
  </div>
</template>
