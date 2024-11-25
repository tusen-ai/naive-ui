<markdown>
# 文件树

使用 `on-update:expanded-keys` 来更改节点在不同状态下的前缀图标样式。
</markdown>

<script lang="ts">
import type { TreeOption } from 'naive-ui'
import {
  FileTrayFullOutline,
  Folder,
  FolderOpenOutline
} from '@vicons/ionicons5'
import { NIcon, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    const updatePrefixWithExpaned = (
      _keys: Array<string | number>,
      _option: Array<TreeOption | null>,
      meta: {
        node: TreeOption | null
        action: 'expand' | 'collapse' | 'filter'
      }
    ) => {
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
    const nodeProps = ({ option }: { option: TreeOption }) => {
      return {
        onClick() {
          if (!option.children && !option.disabled) {
            message.info(`[Click] ${option.label}`)
          }
        }
      }
    }
    return {
      updatePrefixWithExpaned,
      nodeProps,
      data: [
        {
          key: '文件夹',
          label: '文件夹',
          prefix: () =>
            h(NIcon, null, {
              default: () => h(Folder)
            }),
          children: [
            {
              key: '空的',
              label: '空的',
              disabled: true,
              prefix: () =>
                h(NIcon, null, {
                  default: () => h(Folder)
                })
            },
            {
              key: '我的文件',
              label: '我的文件',
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
    }
  }
})
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
