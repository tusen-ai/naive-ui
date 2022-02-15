<markdown>
# 选择人员

我发现很多场景需要把 Select 改为一个人员选择器，这是一个教你如何定制的演示。
</markdown>

<template>
  <n-space vertical>
    <n-select
      :options="options"
      :render-label="renderLabel"
      :render-tag="renderSingleSelectTag"
    />
    <n-select
      :options="options"
      :render-label="renderLabel"
      :render-tag="renderSingleSelectTag"
      filterable
    />
    <n-select
      multiple
      :options="options"
      :render-label="renderLabel"
      :render-tag="renderMultipleSelectTag"
    />
    <n-select
      multiple
      :options="options"
      :render-label="renderLabel"
      :render-tag="renderMultipleSelectTag"
      filterable
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import {
  NAvatar,
  NText,
  NTag,
  SelectRenderTag,
  SelectRenderLabel
} from 'naive-ui'

export default defineComponent({
  setup () {
    const renderMultipleSelectTag: SelectRenderTag = ({
      option,
      handleClose
    }) => {
      return h(
        NTag,
        {
          style: {
            padding: '0 6px 0 4px'
          },
          round: true,
          closable: true,
          onClose: (e) => {
            e.stopPropagation()
            handleClose()
          }
        },
        {
          default: () =>
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center'
                }
              },
              [
                h(NAvatar, {
                  src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
                  round: true,
                  size: 22,
                  style: {
                    marginRight: '4px'
                  }
                }),
                option.label as string
              ]
            )
        }
      )
    }
    const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(NAvatar, {
            src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
            round: true,
            size: 24,
            style: {
              marginRight: '12px'
            }
          }),
          option.label as string
        ]
      )
    }
    const renderLabel: SelectRenderLabel = (option) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(NAvatar, {
            src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
            round: true,
            size: 'small'
          }),
          h(
            'div',
            {
              style: {
                marginLeft: '12px',
                padding: '4px 0'
              }
            },
            [
              h('div', null, [option.label as string]),
              h(
                NText,
                { depth: 3, tag: 'div' },
                {
                  default: () => 'description'
                }
              )
            ]
          )
        ]
      )
    }
    return {
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: '08akioni',
          value: '08akioni'
        },
        {
          label: '09akioni',
          value: '09akioni'
        }
      ],
      renderMultipleSelectTag,
      renderSingleSelectTag,
      renderLabel
    }
  }
})
</script>
