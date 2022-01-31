<markdown>
# Contextmenu

You can define some contextmenu to complete the functions you need.
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
import { defineComponent, h, reactive, ref, nextTick } from 'vue'
import { DataTableColumns, DropdownOption, useMessage } from 'naive-ui'

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

const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: () => h('span', { style: { color: 'red' } }, '删除'),
    key: 'delete'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)
    const colsReactive: DataTableColumns = reactive([
      {
        title: 'Left',
        key: 'Left'
      },
      {
        title: 'Right',
        key: 'Right'
      }
    ])

    return {
      cols: colsReactive,
      data,
      options,
      showDropdown: showDropdownRef,
      x: xRef,
      y: yRef,
      handleSelect (key) {
        message.info(key)
        showDropdownRef.value = false
      },
      onClickoutside (e) {
        message.info('clickoutside')
        showDropdownRef.value = false
      },
      rowProps: (row) => {
        return {
          style: 'cursor: pointer;',
          onContextmenu: (e) => {
            console.log('context menu', row)
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
