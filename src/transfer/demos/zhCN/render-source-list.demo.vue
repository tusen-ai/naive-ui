<markdown>
# 自定义列表
</markdown>

<template>
  <n-transfer
    ref="transfer"
    v-model:value="value"
    :options="options"
    :render-source-list="renderSourceList"
    source-filterable
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { repeat } from 'seemly'
import { NTree, TransferRenderSourceList } from 'naive-ui'

function createLabel (level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

type Option = {
  label: string
  value: string
  children?: Option[]
}

function createData (level = 4, baseKey = ''): Option[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const value = '' + baseKey + level + index
    return {
      label: createLabel(level),
      value,
      children: createData(level - 1, value)
    }
  })
}

function flattenTree (list: undefined | Option[]): Option[] {
  const result: Option[] = []
  function flatten (_list: Option[] = []) {
    _list.forEach((item) => {
      result.push(item)
      flatten(item.children)
    })
  }
  flatten(list)
  return result
}

export default defineComponent({
  setup () {
    const treeData = createData()
    const valueRef = ref<Array<string | number>>([])
    const renderSourceList: TransferRenderSourceList = function ({
      onCheck,
      pattern
    }) {
      return h(NTree, {
        style: 'margin: 0 4px;',
        keyField: 'value',
        checkable: true,
        selectable: false,
        blockLine: true,
        checkOnClick: true,
        data: treeData,
        pattern,
        checkedKeys: valueRef.value,
        onUpdateCheckedKeys: (checkedKeys: Array<string | number>) => {
          onCheck(checkedKeys)
        }
      })
    }
    return {
      options: flattenTree(createData()),
      value: valueRef,
      renderSourceList
    }
  }
})
</script>
