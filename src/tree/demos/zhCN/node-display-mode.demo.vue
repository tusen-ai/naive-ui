<markdown>
# 节点展示方式

你可以使用 `get-children` 实现不同的节点展示方式
</markdown>

<template>
  <n-flex vertical align="start">
    <n-switch v-model:value="active" />
    <n-tree
      block-line
      :data="data"
      :default-expanded-keys="defaultExpandedKeys"
      expand-on-click
      checkable
      :get-children="
        active
          ? (v) => (v.children?.length ? v.children : undefined)
          : undefined
      "
    />
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { TreeOption } from 'naive-ui'

function createData (level = 3, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: level === 2 ? [] : createData(level - 1, key)
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
      data: createData(),
      defaultExpandedKeys: ref(['30', '31']),
      active: ref(false)
    }
  }
})
</script>
