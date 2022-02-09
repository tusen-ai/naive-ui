<markdown>
# Context menu

Use `n-dropdown` to implement a context menu.
</markdown>

<template>
  <n-data-table :columns="cols" :data="data" :row-props="rowProps" />
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>

<script lang="ts">
import { defineComponent, h, ref, nextTick } from 'vue'
import { DataTableColumns, DropdownOption, useMessage } from 'naive-ui'

type Song = {
  no: number
  title: string
  length: string
}

const data: Song[] = [
  { no: 1, title: 'Hello', length: '3:21' },
  { no: 2, title: 'Roll with It', length: '3:59' },
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 5, title: 'Hey Now!', length: '5:41' },
  { no: 6, title: 'Untitled', length: '0:44' },
  { no: 7, title: 'Some Might Say', length: '5:29' },
  { no: 8, title: 'Cast No Shadow', length: '4:51' },
  { no: 9, title: "She's Electric", length: '3:40' },
  { no: 10, title: 'Monring Glory', length: '5:03' },
  { no: 11, title: 'Untitled', length: '0:39' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

const options: DropdownOption[] = [
  {
    label: 'Edit',
    key: 'edit'
  },
  {
    label: () => h('span', { style: { color: 'red' } }, 'Delete'),
    key: 'delete'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)
    const colsReactive: DataTableColumns<Song> = [
      {
        title: 'No.',
        key: 'no'
      },
      {
        title: 'Title',
        key: 'title'
      },
      {
        title: 'Length',
        key: 'length'
      }
    ]

    return {
      cols: colsReactive,
      data,
      options,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      handleSelect () {
        showDropdownRef.value = false
      },
      onClickoutside () {
        showDropdownRef.value = false
      },
      rowProps: (row: Song) => {
        return {
          onContextmenu: (e: MouseEvent) => {
            message.info(JSON.stringify(row, null, 2))
            e.preventDefault()
            showDropdownRef.value = false
            nextTick().then(() => {
              showDropdownRef.value = true
              xRef.value = e.clientX
              yRef.value = e.clientY
            })
          }
        }
      }
    }
  }
})
</script>
