<markdown>
# Scrollbar debug
</markdown>

<template>
  <n-tree
    block-line
    :data="data"
    default-expand-all
    virtual-scroll
    style="height: 320px; background-color: #cce3db"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { repeat } from 'seemly'
import { TreeOption } from 'naive-ui'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(5 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
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
export default defineComponent({
  setup () {
    return {
      data: createData()
    }
  }
})
</script>
