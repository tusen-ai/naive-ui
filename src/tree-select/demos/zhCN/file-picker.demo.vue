<markdown>
# 文件选择器

利用 `override-default-node-click-behavoir` 属性模拟仅允许选中文件、而不允许选中文件夹的行为。
</markdown>

<template>
  <n-tree-select
    block-line
    :options="options"
    :override-default-node-click-behavior="override"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TreeSelectOverrideNodeClickBehavior } from 'naive-ui'

export default defineComponent({
  setup () {
    const override: TreeSelectOverrideNodeClickBehavior = ({ option }) => {
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
