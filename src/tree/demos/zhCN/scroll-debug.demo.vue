<markdown>
# Scroll debug
</markdown>

<template>
  <div>
    <n-scrollbar x-scrollable style="width: 100px; height: 150px">
      <n-tree
        default-expand-all
        style="white-space: nowrap"
        block-line
        :data="data"
      />
    </n-scrollbar>
    <n-scrollbar x-scrollable style="width: 300px; height: 150px">
      <n-tree
        default-expand-all
        style="white-space: nowrap"
        block-line
        :data="data"
      />
    </n-scrollbar>
    <n-tree default-expand-all style="" block-line :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NScrollbar, NTree, TreeOption } from 'naive-ui'

function createData (level = 10): TreeOption[] {
  if (!level) return []
  return [
    {
      label: 'foooooooooooooooooo',
      key: `node-${level}`,
      children: createData(level - 1)
    }
  ]
}

export default defineComponent({
  components: {
    NScrollbar,
    NTree
  },
  setup () {
    return {
      data: createData()
    }
  }
})
</script>
