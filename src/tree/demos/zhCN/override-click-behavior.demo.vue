<markdown>
# 自定义点击后的行为

你可以利用 `override-default-node-click-behavoir` 属性来覆盖默认的点击行为。

例如下面的例子中，你可以使非根节点的点击行为变成展开，来模拟仅允许选中文件、而不允许选中文件夹的行为。
</markdown>

<template>
  <n-tree
    block-line
    :data="options"
    :override-default-node-click-behavior="override"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TreeOverrideNodeClickBehavior } from 'naive-ui'

export default defineComponent({
  setup () {
    const override: TreeOverrideNodeClickBehavior = ({ option }) => {
      if (option.children) {
        return 'toggleExpand'
      }
      return 'default'
    }
    return {
      override,
      options: [
        {
          label: 'Folder-1',
          key: 'Folder-1',
          children: [
            {
              label: 'File-1-1',
              key: 'File-1-1'
            },
            {
              label: 'Folder-1-2',
              key: 'Folder-1-2',
              children: [
                {
                  label: 'File-1-2-1',
                  key: 'File-1-2-1'
                },
                {
                  label: 'File-1-2-2',
                  key: 'File-1-2-2'
                }
              ]
            }
          ]
        },
        {
          label: 'Folder-2',
          key: 'Folder-2',
          children: [
            {
              label: 'File-2-1',
              key: 'File-2-1'
            },
            {
              label: 'File-2-2',
              key: 'File-2-2'
            }
          ]
        }
      ]
    }
  }
})
</script>
