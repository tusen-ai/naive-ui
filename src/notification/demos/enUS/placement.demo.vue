<markdown>
# Placement
</markdown>

<script lang="ts" setup>
import type { NotificationPlacement } from 'naive-ui'
import { NButton, NSpace, useNotification } from 'naive-ui'
import { h, ref } from 'vue'

const placementRef = ref<NotificationPlacement>('top-right')

function handlePlacementChange(val: NotificationPlacement) {
  placementRef.value = val
}

function PlacementButtons(props: {
  onPlacementChange?: (placement: NotificationPlacement) => void
}) {
  const notification = useNotification()
  const placementList = [
    { placement: 'top-left' as const, text: 'Top left' },
    { placement: 'top-right' as const, text: 'Top right' },
    { placement: 'bottom-left' as const, text: 'Bottom left' },
    { placement: 'bottom-right' as const, text: 'Bottom right' },
    { placement: 'bottom' as const, text: 'Bottom' },
    { placement: 'top' as const, text: 'Top' }
  ]

  return h(NSpace, null, {
    default: () =>
      placementList.map(item =>
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
</script>

<template>
  <n-notification-provider :placement="placementRef">
    <PlacementButtons :on-placement-change="handlePlacementChange" />
  </n-notification-provider>
</template>
