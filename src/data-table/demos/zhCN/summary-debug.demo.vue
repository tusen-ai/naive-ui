<markdown>
  # Summary debug
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

function createColumns() {
  return [
    {
      title: 'parehnt',
      children: [
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Name',
          key: 'name',
          fixed: 'left'
        }
      ]
    },
    {
      title: 'Address',
      key: 'address'
    }
  ] as any
}

function createColumns2(): DataTableColumns<RowData> {
  return [
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
      key: 'row'
    },
    {
      title: 'Row1',
      key: 'row1'
    },
    {
      title: 'Row2',
      key: 'row2',
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
}

let scrollX = 0
function createColumns3() {
  scrollX = 0
  const columns: DataTableColumns<RowData> = []
  for (let i = 0; i < 1000; ++i) {
    scrollX += 100
    columns.push({
      title: `Col ${i}`,
      width: 100,
      key: i,
      fixed: i <= 1 ? 'left' : i > 997 ? 'right' : undefined,
      render(_, rowIndex) {
        return `${i}-${rowIndex}`
      }
    })
  }
  return columns
}

function createData2() {
  const data: RowData[] = Array.from({ length: 1000 }).map((_, index) => ({
    key: index,
    name: `Edward King ${index}`,
    age: 32,
    address: `London, Park Lane no. ${index}`
  }))
  return data
}

function createData(length = 3) {
  return Array.from({ length }).map((_, index) => ({
    key: index,
    name: `Edward King ${index}`,
    age: 32,
    address: `London, Park Lane no. ${index}`,
    row: `row-${index}`,
    row1: `row1-${index}`,
    row2: `row2-${index}`
  }))
}

function createSummary() {
  return [
    {
      name: {
        value: h('span', { style: { color: 'red' } }, '7'),
        colSpan: 2,
        rowSpan: 1
      },
      age: {
        value: h('span', null, '6')
      }
    }
  ]
}

function createSummary2(length = 2) {
  return Array.from({ length }).map((_, index) => ({
    name: {
      value: h('span', { style: { color: 'red' } }, 7 + index)
    },
    age: {
      value: h('span', null, 6 + index)
    },
    row: { value: `row-${index}` },
    row1: { value: `row1-${index}` },
    row2: { value: `row2-${index}` },
    address: {
      value: index
    }
  }))
}

function createSummary3(length = 100) {
  return Array.from({ length }).map(() =>
    Array.from({ length: 1000 }).reduce<Record<any, any>>((pre, cur, index) => {
      pre[index] = { value: index }
      return pre
    }, {})
  )
}

export default defineComponent({
  setup() {
    return {
      scrollX,
      createData,
      createData2,
      createSummary,
      createSummary2,
      createSummary3,
      createColumns,
      createColumns2,
      createColumns3
    }
  }
})
</script>

<template>
  <n-space vertical :size="12">
    <n-data-table
      :columns="createColumns()"
      :data="createData()"
      :summary="createSummary"
    />
    <n-data-table
      :columns="createColumns()"
      :data="createData(10)"
      max-height="200"
      sticky-summary
      :summary="createSummary"
      summary-placement="top"
    />
    <n-data-table
      :columns="createColumns()"
      :data="createData(10)"
      max-height="200"
      sticky-summary
      :summary="createSummary"
      summary-placement="bottom"
    />
    <n-data-table
      :columns="createColumns2()"
      :data="createData(20)"
      :pagination="{ pageSize: 10 }"
      :scroll-x="1800"
      :style="{ height: `300px` }"
      flex-height
      :summary="() => createSummary2(3)"
      sticky-summary
    />
    <n-data-table
      :columns="createColumns2()"
      :data="createData(20)"
      :pagination="{ pageSize: 10 }"
      :scroll-x="1800"
      :style="{ height: `300px` }"
      flex-height
      :summary="() => createSummary2(3)"
      sticky-summary
      summary-placement="top"
    />
    <n-data-table
      :columns="createColumns2()"
      :data="createData(20)"
      :pagination="{ pageSize: 10 }"
      :scroll-x="1800"
      :style="{ height: `300px` }"
      flex-height
      :summary="() => createSummary2(3)"
      sticky-summary
      summary-max-height="70"
      summary-placement="top"
    />
    <n-data-table
      :columns="createColumns3()"
      :data="createData2()"
      :max-height="250"
      virtual-scroll
      virtual-scroll-x
      :scroll-x="scrollX"
      :min-row-height="48"
      :height-for-row="() => 48"
      virtual-scroll-header
      :header-height="48"
      :summary="() => createSummary3(1000)"
      :summary-max-height="200"
      sticky-summary
    />
  </n-space>
</template>
