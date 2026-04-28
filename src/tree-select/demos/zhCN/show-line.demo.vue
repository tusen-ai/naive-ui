<markdown>
# 连接线

使用 `show-line` 属性显示树的连接线。
</markdown>

<script lang="ts" setup>
import type { TreeSelectOption } from 'naive-ui'

const options: TreeSelectOption[] = [
  {
    label: 'Rubber Soul',
    key: 'Rubber Soul',
    children: [
      {
        label: 'Drive My Car',
        key: 'Drive My Car'
      },
      {
        label: 'Norwegian Wood',
        key: 'Norwegian Wood'
      },
      {
        label: 'You Won\'t See',
        key: 'You Won\'t See'
      },
      {
        label: 'Nowhere Man',
        key: 'Nowhere Man'
      },
      {
        label: 'Think For Yourself',
        key: 'Think For Yourself'
      }
    ]
  },
  {
    label: 'Let It Be',
    key: 'Let It Be Album',
    children: [
      {
        label: 'Two Of Us',
        key: 'Two Of Us'
      },
      {
        label: 'Dig A Pony',
        key: 'Dig A Pony'
      },
      {
        label: 'Across The Universe',
        key: 'Across The Universe'
      },
      {
        label: 'Let It Be',
        key: 'Let It Be'
      },
      {
        label: 'Get Back',
        key: 'Get Back'
      }
    ]
  }
]
</script>

<template>
  <n-tree-select
    show-line
    default-expand-all
    :options="options"
    default-value="Drive My Car"
  />
</template>
