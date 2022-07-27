<markdown>
# Custom label

Transfer can be applied for many scenarios.
</markdown>

<template>
  <n-transfer
    ref="transfer"
    v-model:value="value"
    :options="options"
    :render-target-label="renderLabel"
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { NAvatar, TransferRenderTargetLabel } from 'naive-ui'

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
  setup () {
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
