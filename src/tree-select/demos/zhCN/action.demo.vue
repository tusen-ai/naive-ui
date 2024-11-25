<markdown>
# 操作插槽

可能你需要在树型选择菜单里用这个插槽。
</markdown>

<script lang="ts">
import type { TreeSelectOption } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      handleUpdateValue(
        value: string | number | Array<string | number> | null,
        option: TreeSelectOption | null | Array<TreeSelectOption | null>
      ) {
        console.log(value, option)
      },
      options: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label:
                'Everybody\'s Got Something to Hide Except Me and My Monkey',
              key: 'Everybody\'s Got Something to Hide Except Me and My Monkey'
            },
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
              disabled: true
            },
            {
              label: 'Norwegian Wood',
              key: 'Norwegian Wood'
            },
            {
              label: 'You Won\'t See',
              key: 'You Won\'t See',
              disabled: true
            },
            {
              label: 'Nowhere Man',
              key: 'Nowhere Man'
            },
            {
              label: 'Think For Yourself',
              key: 'Think For Yourself'
            },
            {
              label: 'The Word',
              key: 'The Word'
            },
            {
              label: 'Michelle',
              key: 'Michelle',
              disabled: true
            },
            {
              label: 'What goes on',
              key: 'What goes on'
            },
            {
              label: 'Girl',
              key: 'Girl'
            },
            {
              label: 'I\'m looking through you',
              key: 'I\'m looking through you'
            },
            {
              label: 'In My Life',
              key: 'In My Life'
            },
            {
              label: 'Wait',
              key: 'Wait'
            }
          ]
        }
      ]
    }
  }
})
</script>

<template>
  <n-tree-select
    :options="options"
    default-value="Drive My Car"
    @update:value="handleUpdateValue"
  >
    <template #header>
      不知道放些什么
    </template>
    <template #action>
      你可以在这里自定义一些操作
    </template>
  </n-tree-select>
</template>
