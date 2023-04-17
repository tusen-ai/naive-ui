<markdown>
# 固定总结栏

使用 `summaryHeader` 属性渲染固定在表头的总结栏。
</markdown>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :max-height="250"
    :scroll-x="1800"
    virtual-scroll
    :summary-header="summary"
  />
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { DataTableColumns, DataTableCreateSummary } from 'naive-ui'

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

const createSummary: DataTableCreateSummary = (pageData) => {
  return {
    name: {
      value: h('span', { style: { color: 'red' } }, '合计')
    },
    age: {
      value: h(
        'span',
        { style: { color: 'red' } },
        (pageData as RowData[]).reduce(
          (prevValue, row) => prevValue + row.age,
          0
        )
      )
    },
    row: {
      value: h('span', { style: { color: 'red' } }, '-')
    },
    row1: {
      value: h('span', { style: { color: 'red' } }, '-')
    },
    row2: {
      value: h('span', { style: { color: 'red' } }, '-')
    },
    address: {
      value: h('span', { style: { color: 'red' } }, '-')
    }
  }
}

export default defineComponent({
  setup () {
    const data: RowData[] = Array.from({ length: 100 }).map((_, index) => ({
      key: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }))
    return {
      summary: createSummary,
      data,
      columns
    }
  }
})
</script>
