<markdown>
# File Tree

Use `on-update:expanded-keys` to change the prefix icon style of the node in different states.
</markdown>

<script lang="ts" setup>
import type { TreeOption } from 'naive-ui'
import {
  FileTrayFullOutline,
  Folder,
  FolderOpenOutline
} from '@vicons/ionicons5'
import { NIcon, useMessage } from 'naive-ui'
import { h } from 'vue'

const message = useMessage()

function updatePrefixWithExpaned(
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'expand' | 'collapse' | 'filter'
  }
) {
  if (!meta.node)
    return
  switch (meta.action) {
    case 'expand':
      meta.node.prefix = () =>
        h(NIcon, null, {
          default: () => h(FolderOpenOutline)
        })
      break
    case 'collapse':
      meta.node.prefix = () =>
        h(NIcon, null, {
          default: () => h(Folder)
        })
      break
  }
}

function nodeProps({ option }: { option: TreeOption }) {
  return {
    onClick() {
      if (!option.children && !option.disabled) {
        message.info(`[Click] ${option.label}`)
      }
    }
  }
}

const data = [
  {
    key: 'Folder',
    label: 'Folder',
    prefix: () =>
      h(NIcon, null, {
        default: () => h(Folder)
      }),
    children: [
      {
        key: 'Empty',
        label: 'Empty',
        disabled: true,
        prefix: () =>
          h(NIcon, null, {
            default: () => h(Folder)
          })
      },
      {
        key: 'MyFiles',
        label: 'MyFiles',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(Folder)
          }),
        children: [
          {
            label: 'template.txt',
            key: 'template.txt',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(FileTrayFullOutline)
              })
          }
        ]
      }
    ]
  }
]
</script>

<template>
  <n-tree
    block-line
    expand-on-click
    :data="data"
    :node-props="nodeProps"
    :on-update:expanded-keys="updatePrefixWithExpaned"
  />
</template>
