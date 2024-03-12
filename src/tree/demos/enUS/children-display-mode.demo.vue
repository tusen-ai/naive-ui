<markdown>
# Node display mode

You can use `get-children` to implement different ways of displaying nodes.
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
    console.log(key)

    return {
      label: createLabel(level),
      key,
      children: level === 2 ? [] : createData(level - 1, key)
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
      defaultExpandedKeys: ref(['30', '31']),
      active: ref(false)
    }
  }
})
</script>
