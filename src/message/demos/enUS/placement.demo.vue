<markdown>
# Placement
</markdown>

<script lang="ts">
import type { MessageProviderProps } from 'naive-ui'
import type { VNode } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface Item {
  placement: MessageProviderProps['placement']
  text: string
}
export const Buttons = defineComponent({
  emits: ['changePlacement'],
  setup() {
    const message = useMessage()
    const placementArray: Item[] = [
      { placement: 'top', text: 'Top' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'top-left', text: 'TopLeft' },
      { placement: 'top-right', text: 'TopRight' },
      { placement: 'bottom-left', text: 'BottomLeft' },
      { placement: 'bottom-right', text: 'BottomRight' }
    ]
    return {
      message,
      placementArray
    }
  },
  render(): VNode[] {
    const { message, placementArray, $emit } = this
    return placementArray.map((item: Item) =>
      h(
        NButton,
        {
          onClick: () => {
            $emit('changePlacement', item.placement)
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

export default defineComponent({
  components: {
    Buttons
  },
  setup() {
    const placementRef = ref<MessageProviderProps['placement']>('top')
    return {
      placement: placementRef,
      changePlacement(val: MessageProviderProps['placement']) {
        placementRef.value = val
      }
    }
  }
})
</script>

<template>
  <n-message-provider :placement="placement">
    <Buttons @change-placement="changePlacement" />
  </n-message-provider>
</template>
