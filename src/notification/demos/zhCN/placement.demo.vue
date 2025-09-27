<markdown>
# 弹出位置
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
    { placement: 'top-left', text: '左上' },
    { placement: 'top-right', text: '右上' },
    { placement: 'bottom-left', text: '左下' },
    { placement: 'bottom-right', text: '右下' },
    { placement: 'bottom', text: '下' },
    { placement: 'top', text: '上' }
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
