<markdown>
# Pure rendering content

You can just render something which is not related to options data by setting `type='render'` on option.
</markdown>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>Just some text</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { useMessage, NAvatar, NText } from 'naive-ui'

function renderCustomHeader () {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG'
      }),
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => 'A worker at Hangzhou' })
        ]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => '<???>' })
        ])
      ])
    ]
  )
}

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options: [
        {
          key: 'header',
          type: 'render',
          render: renderCustomHeader
        },
        {
          key: 'header-divider',
          type: 'divider'
        },
        {
          label: 'lpsum1',
          key: 'stmt1'
        },
        {
          label: 'lpsum2',
          key: 'stmt2'
        },
        {
          label: 'lpsum3',
          key: 'stmt3'
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
