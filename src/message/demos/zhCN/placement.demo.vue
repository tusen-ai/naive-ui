<markdown>
# 位置
</markdown>

<template>
  <n-message-provider :placement="placement">
    <Buttons @change-placement="changePlacement" />
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref, VNode } from 'vue'
import { useMessage, NButton } from 'naive-ui'
import type { MessageProviderProps } from 'naive-ui'

interface Item {
  placement: MessageProviderProps['placement']
  text: string
}

export const Buttons = defineComponent({
  emits: ['changePlacement'],
  setup () {
    const message = useMessage()
    const placementArray: Item[] = [
      { placement: 'top', text: '顶部' },
      { placement: 'bottom', text: '底部' },
      { placement: 'top-left', text: '左上' },
      { placement: 'top-right', text: '右上' },
      { placement: 'bottom-left', text: '左下' },
      { placement: 'bottom-right', text: '右下' }
    ]
    return {
      message,
      placementArray
    }
  },
  render (): VNode[] {
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
  setup () {
    const placementRef = ref<MessageProviderProps['placement']>('top')
    return {
      placement: placementRef,
      changePlacement (val: MessageProviderProps['placement']) {
        placementRef.value = val
      }
    }
  }
})
</script>
