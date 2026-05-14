<markdown>
# 空表格 & 滚动条 Debug

覆盖空表格以及所有可能出现滚动条的场景组合，验证有数据和无数据时的滚动条行为。
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  city: string
  zip: string
  country: string
  phone: string
  email: string
}

const columns: DataTableColumns<RowData> = [
  { title: 'Name', key: 'name', width: 200, fixed: 'left' },
  { title: 'Age', key: 'age', width: 100 },
  { title: 'Address', key: 'address', width: 300 },
  { title: 'City', key: 'city', width: 200 },
  { title: 'Zip', key: 'zip', width: 150 },
  { title: 'Country', key: 'country', width: 200 },
  { title: 'Phone', key: 'phone', width: 200 },
  { title: 'Email', key: 'email', width: 250, fixed: 'right' }
]

const manyRows: RowData[] = Array.from({ length: 50 }).map((_, i) => ({
  key: i,
  name: `User ${i}`,
  age: 20 + (i % 30),
  address: `No. ${i} Park Lane`,
  city: `City ${i}`,
  zip: `${10000 + i}`,
  country: `Country ${i % 5}`,
  phone: `+1-555-${String(i).padStart(4, '0')}`,
  email: `user${i}@example.com`
}))

const fewRows: RowData[] = manyRows.slice(0, 3)
const emptyData: RowData[] = []
</script>

<template>
  <n-space vertical size="large">
    <n-h3>一、仅 scroll-x</n-h3>

    <n-card title="1. scroll-x + 多数据">
      <n-data-table
        :columns="columns"
        :data="manyRows"
        :scroll-x="1800"
        :pagination="{ pageSize: 5 }"
      />
    </n-card>

    <n-card title="2. scroll-x + 少量数据">
      <n-data-table :columns="columns" :data="fewRows" :scroll-x="1800" />
    </n-card>

    <n-card title="3. scroll-x + 无数据">
      <n-data-table :columns="columns" :data="emptyData" :scroll-x="1800" />
    </n-card>

    <n-h3>二、max-height + scroll-x</n-h3>

    <n-card title="4. max-height + scroll-x + 多数据（纵向+横向滚动条）">
      <n-data-table
        :columns="columns"
        :data="manyRows"
        :scroll-x="1800"
        :max-height="200"
      />
    </n-card>

    <n-card title="5. max-height + scroll-x + 少量数据（不超 max-height）">
      <n-data-table
        :columns="columns"
        :data="fewRows"
        :scroll-x="1800"
        :max-height="300"
      />
    </n-card>

    <n-card title="6. max-height + scroll-x + 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        :scroll-x="1800"
        :max-height="300"
      />
    </n-card>

    <n-card title="7. max-height（无 scroll-x）+ 多数据">
      <n-data-table :columns="columns" :data="manyRows" :max-height="200" />
    </n-card>

    <n-card title="8. max-height（无 scroll-x）+ 无数据">
      <n-data-table :columns="columns" :data="emptyData" :max-height="300" />
    </n-card>

    <n-h3>三、flex-height + scroll-x</n-h3>

    <n-card title="9. flex-height + scroll-x + 多数据（纵向+横向滚动条）">
      <n-data-table
        :columns="columns"
        :data="manyRows"
        :scroll-x="1800"
        flex-height
        style="height: 250px"
      />
    </n-card>

    <n-card title="10. flex-height + scroll-x + 少量数据">
      <n-data-table
        :columns="columns"
        :data="fewRows"
        :scroll-x="1800"
        flex-height
        style="height: 300px"
      />
    </n-card>

    <n-card title="11. flex-height + scroll-x + 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        :scroll-x="1800"
        flex-height
        style="height: 300px"
      />
    </n-card>

    <n-card title="12. flex-height（无 scroll-x）+ 多数据">
      <n-data-table
        :columns="columns"
        :data="manyRows"
        flex-height
        style="height: 250px"
      />
    </n-card>

    <n-card title="13. flex-height（无 scroll-x）+ 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        flex-height
        style="height: 300px"
      />
    </n-card>

    <n-h3>四、fixed columns + scroll-x</n-h3>

    <n-card title="14. fixed columns + scroll-x + 多数据">
      <n-data-table
        :columns="columns"
        :data="manyRows"
        :scroll-x="1800"
        :max-height="200"
      />
    </n-card>

    <n-card title="15. fixed columns + scroll-x + 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        :scroll-x="1800"
        :max-height="300"
      />
    </n-card>

    <n-card title="16. fixed columns + flex-height + scroll-x + 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        :scroll-x="1800"
        flex-height
        style="height: 300px"
      />
    </n-card>

    <n-h3>五、min-height + scroll-x</n-h3>

    <n-card title="17. min-height + max-height + scroll-x + 无数据">
      <n-data-table
        :columns="columns"
        :data="emptyData"
        :scroll-x="1800"
        :max-height="400"
        :min-height="150"
      />
    </n-card>

    <n-card title="18. min-height + max-height + scroll-x + 少量数据">
      <n-data-table
        :columns="columns"
        :data="fewRows"
        :scroll-x="1800"
        :max-height="400"
        :min-height="150"
      />
    </n-card>

    <n-h3>六、无 scroll-x 基准对照</n-h3>

    <n-card title="19. 无 scroll-x + 有数据（基准）">
      <n-data-table :columns="columns" :data="fewRows" />
    </n-card>

    <n-card title="20. 无 scroll-x + 无数据（基准）">
      <n-data-table :columns="columns" :data="emptyData" />
    </n-card>
  </n-space>
</template>
