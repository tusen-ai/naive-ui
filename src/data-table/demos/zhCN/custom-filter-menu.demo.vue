<markdown>
# 自定义图标

你可以自定义过滤图标、过滤菜单、排序图标、展开图标的样式。
</markdown>

<template>
  <n-data-table
    :columns="cols"
    :data="data"
    :render-expand-icon="renderExpandIcon"
  />
</template>

<script lang="ts">
import { defineComponent, h, reactive } from 'vue'
import {
  NButton,
  NSpace,
  NIcon,
  DataTableColumns,
  DataTableBaseColumn
} from 'naive-ui'
import { PawOutline, SearchOutline } from '@vicons/ionicons5'

const data = [
  {
    Left: '1',
    Right: '1'
  },
  {
    Left: '2',
    Right: '2'
  }
]

export default defineComponent({
  setup () {
    const renderExpandIcon = () => {
      return h(NIcon, null, { default: () => h(PawOutline) })
    }
    const filterColumn = reactive<DataTableBaseColumn>({
      title: 'Right',
      key: 'Right',
      filter: 'default',
      filterOptionValue: null,
      renderFilterIcon: () => {
        return h(NIcon, null, { default: () => h(SearchOutline) })
      },
      renderFilterMenu: ({ hide }) => {
        return h(
          NSpace,
          { style: { padding: '12px' }, vertical: true },
          {
            default: () => [
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = '1'
                  }
                },
                { default: () => 'Filter by 1' }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = '2'
                  }
                },
                { default: () => 'Filter by 2' }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = null
                    hide()
                  }
                },
                { default: () => 'clear' }
              )
            ]
          }
        )
      }
    })
    const colsReactive: DataTableColumns = reactive([
      {
        type: 'expand',
        renderExpand: () => {
          return 'Expand content'
        }
      },
      {
        title: 'Left',
        key: 'Left',
        sorter: 'default',
        renderSorterIcon: ({ order }) => {
          const style = 'transform: translateY(-3px);'
          if (order === false) return h('div', { style }, ['🤔'])
          if (order === 'ascend') return h('div', { style }, ['👇'])
          if (order === 'descend') return h('div', { style }, ['👆'])
        }
      },
      filterColumn
    ])

    return {
      cols: colsReactive,
      data,
      renderExpandIcon
    }
  }
})
</script>
