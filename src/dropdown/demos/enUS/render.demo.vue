<markdown>
# Pure Render Content

You can simply render some content unrelated to option data. In this case, you can add an option with `type='render'`.
</markdown>

<script lang="ts" setup>
import { NAvatar, NText, useMessage } from 'naive-ui'
import { h } from 'vue'

function renderCustomHeader() {
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
          h(NText, { depth: 2 }, { default: () => 'Office Worker' })
        ]),
        h('div', { style: 'font-size: 12px;' }, [
          h(
            NText,
            { depth: 3 },
            {
              default: () =>
                'No doubt, you are the brightest star in the office'
            }
          )
        ])
      ])
    ]
  )
}

const message = useMessage()
const options = [
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
    label: 'Processed 342 group messages',
    key: 'stmt1'
  },
  {
    label: 'Mentioned 58 times',
    key: 'stmt2'
  },
  {
    label: 'Joined 17 groups',
    key: 'stmt3'
  }
]

function handleSelect(key: string | number) {
  message.info(String(key))
}
</script>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>2021 Week 36</n-button>
  </n-dropdown>
</template>
