<markdown>
# Empty Debug
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'
import { NSwitch } from 'naive-ui'
import { defineComponent, h, ref, watch } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  city: string
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name',
    width: 180
  },
  {
    title: 'Age',
    key: 'age',
    width: 120
  },
  {
    title: 'Address',
    key: 'address',
    width: 260
  },
  {
    title: 'City',
    key: 'city',
    width: 220
  }
]

const emptyData = ref<RowData[]>([])
const loadData = ref(false)

function generateData() {
  emptyData.value = Array.from({ length: 20 }).map((_, index) => ({
    key: index,
    name: `Name ${index}`,
    age: index,
    address: `Address ${index}`,
    city: `City ${index}`
  }))
}

watch(loadData, (newVal) => {
  if (newVal) {
    generateData()
  }
  else {
    emptyData.value = []
  }
})

const CompSwitch = defineComponent({
  setup() {
    return () =>
      h(NSwitch, null, {
        checked: () => 'Load Data',
        unchecked: () => 'Show Empty'
      })
  }
})
</script>

<template>
  Base Empty
  <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" />
  Height 400px <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" style="height: 400px" />
  Min Height 400px <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" :min-height="400" />
  Max Height 400px <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" :max-height="400" />
  Scroll X Empty <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" :scroll-x="1800" />
  Flex Height Empty <CompSwitch v-model:value="loadData" />
  <div style="height: 500px; display: flex; flex-direction: column">
    <n-card style="height: 80px" />
    <n-data-table
      :columns="columns"
      :data="emptyData"
      flex-height
      style="flex: 1"
    />
  </div>
  Flex Height + Scroll X Empty <CompSwitch v-model:value="loadData" />
  <n-data-table
    :columns="columns"
    :data="emptyData"
    :scroll-x="1800"
    flex-height
    style="height: 500px"
  />
  Virtual List Empty <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" :virtual-list="true" />
  Virtual List Empty + Scroll X <CompSwitch v-model:value="loadData" />
  <n-data-table
    :columns="columns"
    :data="emptyData"
    :scroll-x="1800"
    :virtual-list="true"
  />
  Empty Slot <CompSwitch v-model:value="loadData" />
  <n-data-table :columns="columns" :data="emptyData" min-height="400">
    <template #empty>
      <div>Empty Slot</div>
    </template>
  </n-data-table>
</template>
