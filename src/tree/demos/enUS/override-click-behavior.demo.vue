<markdown>
# Custom node click behavior

You can use `override-default-node-click-behavoir` prop to override default node click behavior.

For example, you can change non-leaf key's default behavior to `'toggleExpand'` to simulate a file selector.
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
