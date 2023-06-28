<markdown>
# scroll
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-input-number v-model:value="numValue" style="width: 200px" />
      <n-button @click="handleToKey">
        Use No
      </n-button>
      <n-button @click="handleToIndex">
        Use index
      </n-button>
      <n-button @click="handleToX">
        Use x
      </n-button>
    </n-space>
    <n-data-table
      ref="dataTable"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
      :max-height="200"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DataTableInst } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type TearsOfTheKingdom = {
  key: number
  name: string
  content: string
}

const createColumns = (): DataTableColumns<TearsOfTheKingdom> => {
  return [
    {
      title: 'No',
      key: 'key',
      sorter: (row1, row2) => row1.key - row2.key
    },
    {
      type: 'expand',
      expandable: () => true,
      renderExpand: () => {
        return 'The Legend of Zelda: Tears of the Kingdom is a good game.'
      }
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Content',
      key: 'content',
      defaultFilterOptionValues: [],
      filterOptions: [
        {
          label: '劳鲁的祝福',
          value: '劳鲁的祝福'
        },
        {
          label: '孑然一身之战',
          value: '孑然一身之战'
        }
      ],
      filter (value, row) {
        return !!row.content.includes(String(value))
      }
    }
  ]
}

const data: TearsOfTheKingdom[] = [
  { key: 1, name: '乌可乌侯神庙', content: '创造之力' },
  { key: 2, name: '伊恩伊萨神庙', content: '组合之力' },
  { key: 3, name: '古塔恩巴奇神庙', content: '上升之力' },
  { key: 4, name: '纳裘亚哈神庙', content: '倒流之力' },
  { key: 5, name: '卡哈塔纳乌每神庙', content: '劳鲁的祝福' },
  { key: 6, name: '塔尼诺乌达神庙', content: '劳鲁的祝福' },
  { key: 7, name: '帖恩贝扎伊神庙', content: '下落速度' },
  { key: 8, name: '摩基萨里神庙', content: '纵身之勇' },
  { key: 9, name: '马亚乌每奇萨神庙', content: '跳跃之力' },
  { key: 10, name: '伊乔欧神庙', content: '不止防守' },
  { key: 11, name: '马亚米伊神庙', content: '劳鲁的祝福' },
  { key: 12, name: '希摩希瓦卡神庙', content: '孑然一身之战 黑暗' },
  { key: 13, name: '基卡克恩神庙', content: '劳鲁的祝福' },
  { key: 14, name: '嘎阿喜萨萨神庙', content: '劳鲁的祝福' },
  { key: 15, name: '纳塔卡卡神庙', content: '劳鲁的祝福' },
  { key: 16, name: '塔乌恩喜悠神庙', content: '弓箭的精髓' },
  { key: 17, name: '卡达乌纳里神庙', content: '流水指引之路' },
  { key: 18, name: '嘎诺萨神庙', content: '劳鲁的祝福' },
  { key: 19, name: '吉鲁塔古马奇神庙', content: '飞天之物' },
  { key: 20, name: '伊高修恩神庙', content: '浮游之水' },
  { key: 21, name: '马亚希阿拉神庙', content: '劳鲁的祝福' },
  { key: 22, name: '吉诺多卡欧神庙', content: '劳鲁的祝福' },
  { key: 23, name: '乔希乌神庙', content: '劳鲁的祝福' },
  { key: 24, name: '马亚纳希神庙', content: '以冰引路' },
  { key: 25, name: '希哈乔高乌神庙', content: '劳鲁的祝福' },
  { key: 26, name: '拉卡修高神庙', content: '反射之物' },
  { key: 27, name: '乌可欧吉希神庙', content: '劳鲁的祝福' },
  { key: 28, name: '希亚摩兹希神庙', content: '灯火黯然' },
  { key: 29, name: '乔克乌希尼神庙', content: '孑然一身之战 通电' },
  { key: 30, name: '乔克乌神庙', content: '劳鲁的祝福' },
  { key: 31, name: '克马马伊诺神庙', content: '劳鲁的祝福' },
  { key: 32, name: '亚恩萨米诺神庙', content: '孑然一身之战 重力' }
]

export default defineComponent({
  setup () {
    const numValueRef = ref(0)
    const tableRef = ref<DataTableInst | null>(null)
    function handleToKey () {
      tableRef.value?.scrollToKey(numValueRef.value)
    }
    function handleToIndex () {
      tableRef.value?.scrollToIndex(numValueRef.value)
    }
    function handleToX () {
      tableRef.value?.scrollTo(numValueRef.value, 0)
    }
    return {
      data,
      dataTable: tableRef,
      numValue: numValueRef,
      columns: createColumns(),
      pagination: {
        pageSize: 10
      },
      handleToKey,
      handleToIndex,
      handleToX
    }
  }
})
</script>
