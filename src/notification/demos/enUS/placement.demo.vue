<markdown>
# Placement
</markdown>

<script lang="ts" setup>
import type { NotificationPlacement } from 'naive-ui'
import type { PropType, VNode } from 'vue'
import { NButton, NSpace, useNotification } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface Item {
  placement: NotificationPlacement
  text: string
}

const PlacementButtons = defineComponent({
  props: {
    onPlacementChange: Function as PropType<
      (placement: NotificationPlacement) => void
    >
  },
  setup(props) {
    const notification = useNotification()
    const placementList: Item[] = [
      { placement: 'top-left', text: 'Top left' },
      { placement: 'top-right', text: 'Top right' },
      { placement: 'bottom-left', text: 'Bottom left' },
      { placement: 'bottom-right', text: 'Bottom right' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'top', text: 'Top' }
    ]
    return (): VNode =>
      h(NSpace, null, {
        default: () =>
          placementList.map((item: Item) =>
            h(
              NButton,
              {
                onClick: () => {
                  props.onPlacementChange?.(item.placement)
                  notification.info({
                    title: item.placement,
                    content: 'You can change the placement'
                  })
                }
              },
              { default: () => item.text }
            )
          )
      })
  }
})

const placementRef = ref<NotificationPlacement>('top-right')

function handlePlacementChange(placement: NotificationPlacement) {
  placementRef.value = placement
}
</script>

<template>
  <n-notification-provider :placement="placementRef">
    <PlacementButtons :on-placement-change="handlePlacementChange" />
  </n-notification-provider>
</template>
