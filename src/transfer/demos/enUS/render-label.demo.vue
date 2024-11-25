<markdown>
# Custom label

Transfer can be applied for many scenarios.
</markdown>

<script lang="ts">
import type { TransferRenderTargetLabel } from 'naive-ui'
import { NAvatar } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

const options = [
  {
    label: '07akioni',
    value: 'https://avatars.githubusercontent.com/u/18677354?s=60&v=4'
  },
  {
    label: 'amadeus711',
    value: 'https://avatars.githubusercontent.com/u/46394163?s=60&v=4'
  },
  {
    label: 'Talljack',
    value: 'https://avatars.githubusercontent.com/u/34439652?s=60&v=4'
  },
  {
    label: 'JiwenBai',
    value: 'https://avatars.githubusercontent.com/u/43430022?s=60&v=4'
  },
  {
    label: 'songjianet',
    value: 'https://avatars.githubusercontent.com/u/19239641?s=60&v=4'
  }
]

export default defineComponent({
  setup() {
    const renderLabel: TransferRenderTargetLabel = function ({ option }) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            margin: '6px 0'
          }
        },
        {
          default: () => [
            h(NAvatar, {
              round: true,
              src: option.value as string,
              size: 'small',
              fallbackSrc:
                'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
            }),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginLeft: '6px',
                  alignSelf: 'center'
                }
              },
              { default: () => option.label }
            )
          ]
        }
      )
    }
    return {
      options,
      value: ref([options[0].value]),
      renderLabel
    }
  }
})
</script>

<template>
  <n-transfer
    v-model:value="value"
    :options="options"
    :render-target-label="renderLabel"
  />
</template>
