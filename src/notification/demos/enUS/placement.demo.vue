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
  const placementList: { placement: NotificationPlacement, text: string }[] = [
    { placement: 'top-left', text: 'Top left' },
    { placement: 'top-right', text: 'Top right' },
    { placement: 'bottom-left', text: 'Bottom left' },
    { placement: 'bottom-right', text: 'Bottom right' },
    { placement: 'bottom', text: 'Bottom' },
    { placement: 'top', text: 'Top' }
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
    <PlacementButtons @placement-change="handlePlacementChange" />
  </n-notification-provider>
</template>
