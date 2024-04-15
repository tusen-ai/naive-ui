<markdown>
# File Tree

Use `on-update:expanded-keys` or `render-prefix` to change the prefix icon style of the node in different states.
</markdown>

<template>
  <n-tree
    block-line
    expand-on-click
    :data="data"
    :node-props="nodeProps"
    :on-update:expanded-keys="updatePrefixWithExpaned"
  />
  <n-tree
    block-line
    expand-on-click
    :data="data2"
    :node-props="nodeProps"
    :render-prefix="renderPrefix"
  />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage, NIcon, TreeOption } from 'naive-ui'
import {
  Folder,
  FolderOpenOutline,
  FileTrayFullOutline
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const message = useMessage()
    function updatePrefixWithExpaned (
      _keys: Array<string | number>,
      _option: Array<TreeOption | null>,
      meta: {
        node: TreeOption | null
        action: 'expand' | 'collapse' | 'filter'
      }
    ) {
      if (!meta.node) return
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
    function renderPrefix ({
      option,
      expanded
    }: {
      option: TreeOption
      expanded: boolean
    }) {
      return option.children
        ? expanded
          ? h(NIcon, null, {
            default: () => h(FolderOpenOutline)
          })
          : h(NIcon, null, {
            default: () => h(Folder)
          })
        : h(NIcon, null, {
          default: () => h(FileTrayFullOutline)
        })
    }
    function nodeProps ({ option }: { option: TreeOption }) {
      return {
        onClick () {
          if (!option.children && !option.disabled) {
            message.info('[Click] ' + option.label)
          }
        }
      }
    }
    return {
      updatePrefixWithExpaned,
      renderPrefix,
      nodeProps,
      data: [
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
      ],
      data2: [
        {
          key: 'Folder',
          label: 'Folder',

          children: [
            {
              key: 'Empty',
              label: 'Empty',
              disabled: true
            },
            {
              key: 'MyFiles',
              label: 'MyFiles',

              children: [
                {
                  label: 'template.txt',
                  key: 'template.txt'
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
