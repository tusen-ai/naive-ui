<markdown>
# 自定义行属性

如果你想给行增加一些属性或者事件处理器，使用 `row-props` 属性。
</markdown>

<template>
  <n-data-table :columns="columns" :data="data" :row-props="rowProps" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: string
  address: string
}
export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      rowProps: (row: RowData) => {
        return {
          style: 'cursor: pointer;',
          onClick: () => {
            message.info(row.name)
          }
        }
      },
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data: [
        {
          key: 0,
          name: '07akioni',
          age: '18',
          address: 'Yiheyuan Road'
        },
        {
          key: 1,
          name: '08akioni',
          age: '14',
          address: 'Pingshan Road'
        },
        {
          key: 2,
          name: '09akioni',
          age: '22',
          address: 'Haidian Bridge'
        }
      ]
    }
  }
})
</script>
