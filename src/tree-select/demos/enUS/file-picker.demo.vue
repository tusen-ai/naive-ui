<markdown>
# File picker

Use `override-default-node-click-behavior` to simulate a file picker (folder is not selectable).
</markdown>

<script lang="ts">
import type { TreeSelectOverrideNodeClickBehavior } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
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

<template>
  <n-tree-select
    block-line
    :options="options"
    :override-default-node-click-behavior="override"
  />
</template>
