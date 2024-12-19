<markdown>
# 自定义工具栏

你可以使用 `render-toolbar` 来自定义工具栏。
  </markdown>

<script lang="ts">
import type { ImageRenderToolbarProps } from 'naive-ui'
import { ClipboardOutline, OpenOutline } from '@vicons/ionicons5'
import { NButton, useMessage } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()

    const url = ref('https://picsum.photos/id/10/100/100')

    const renderToolbar = ({ nodes }: ImageRenderToolbarProps) => {
      return [
        nodes.prev,
        nodes.next,
        h(
          NButton,
          {
            circle: true,
            type: 'primary',
            style: { marginLeft: '12px' },
            onClick: () => {
              window.open(url.value)
            }
          },
          {
            icon: () => h(OpenOutline)
          }
        ),
        h(
          NButton,
          {
            circle: true,
            type: 'primary',
            style: { marginLeft: '12px' },
            onClick: async () => {
              await navigator.clipboard.writeText(url.value)
              message.success('已复制到剪贴板')
            }
          },
          {
            icon: () => h(ClipboardOutline)
          }
        )
      ]
    }
    return {
      url,
      renderToolbar
    }
  }
})
</script>

<template>
  <n-image
    width="100"
    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    :render-toolbar="renderToolbar"
  />
</template>
