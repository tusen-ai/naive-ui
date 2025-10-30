<markdown>
# Placement
</markdown>

<script lang="ts" setup>
import type { MessageProviderProps } from 'naive-ui'
import { NButton, useMessage } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface Item {
  placement: MessageProviderProps['placement']
  text: string
}

const placementRef = ref<MessageProviderProps['placement']>('top')

function changePlacement(val: MessageProviderProps['placement']) {
  placementRef.value = val
}

// Buttons component
const Buttons = defineComponent({
  emits: ['changePlacement'],
  setup(props, { emit }) {
    const message = useMessage()
    const placementArray: Item[] = [
      { placement: 'top', text: 'Top' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'top-left', text: 'TopLeft' },
      { placement: 'top-right', text: 'TopRight' },
      { placement: 'bottom-left', text: 'BottomLeft' },
      { placement: 'bottom-right', text: 'BottomRight' }
    ]

    return () =>
      placementArray.map((item: Item) =>
        h(
          NButton,
          {
            onClick: () => {
              emit('changePlacement', item.placement)
              message.info('How many roads must a man walk down')
            },
            style: {
              marginRight: '10px'
            }
          },
          { default: () => item.text }
        )
      )
  }
})
</script>

<template>
  <n-message-provider :placement="placementRef">
    <Buttons @change-placement="changePlacement" />
  </n-message-provider>
</template>
