<markdown>
  # 自定义渲染列头
  </markdown>

<script lang="ts">
import type { DataTableBaseColumn, DataTableColumns } from 'naive-ui'
import type { ComponentInternalInstance, VNode, VNodeChild } from 'vue'
import { NGradientText, NTooltip } from 'naive-ui'
import { defineComponent, getCurrentInstance, h } from 'vue'

interface RowData extends Record<string, unknown> {
  key: number
  name: string
  age: number
  address: string
}

function renderTooltip(trigger: VNode, content: string): VNodeChild {
  return h(NTooltip, null, {
    trigger: () => trigger,
    default: () => content
  })
}

function createColumns(
  _instance: ComponentInternalInstance | null
): DataTableColumns<RowData> {
  return [
    {
      key: 'name',
      title(_column: DataTableBaseColumn<RowData>) {
        return renderTooltip(
          h(
            NGradientText,
            {
              size: 24,
              type: 'danger'
            },
            { default: () => 'Name' }
          ),
          'Tooltip Content'
        )
      }
    },
    {
      key: 'age',
      title(_column: DataTableBaseColumn<RowData>) {
        return h(
          NGradientText,
          {
            size: '20',
            type: 'info'
          },
          { default: () => 'Age' }
        )
      }
    },
    {
      key: 'address',
      title(_column: DataTableBaseColumn<RowData>) {
        return h(
          NGradientText,
          {
            size: '16',
            type: 'warning'
          },
          { default: () => 'Address' }
        )
      }
    }
  ]
}

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default defineComponent({
  setup() {
    const instance = getCurrentInstance()
    return {
      data,
      columns: createColumns(instance),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>
