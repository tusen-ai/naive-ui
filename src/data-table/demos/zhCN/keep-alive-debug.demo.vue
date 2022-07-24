<markdown>
# Keep alive debug
</markdown>

<template>
  <n-button @click="showTable = !showTable">
    showTable: {{ showTable }}
  </n-button>
  <!-- 不虚拟
  <keep-alive>
    <component :is="showTable ? 'component-a' : 'n-empty'" />
  </keep-alive> -->
  虚拟
  <keep-alive>
    <component :is="showTable ? 'component-b' : 'n-empty'" />
  </keep-alive>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Row',
    key: 'row',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row1',
    key: 'row1',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row2',
    key: 'row2',
    render (row, index) {
      return h('span', ['row ', index])
    },
    width: 100,
    fixed: 'right'
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

const data: RowData[] = Array.from({ length: 50 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

const ComponentA = defineComponent({
  render () {
    return h(NDataTable, {
      columns,
      data,
      maxHeight: 250,
      scrollX: 1800
    })
  }
})

const ComponentB = defineComponent({
  render () {
    return h(NDataTable, {
      columns,
      data,
      maxHeight: 250,
      scrollX: 1800,
      virtualScroll: true
    })
  }
})

export default defineComponent({
  components: {
    ComponentA,
    ComponentB
  },
  setup () {
    return {
      showTable: ref(false)
    }
  }
})
</script>
