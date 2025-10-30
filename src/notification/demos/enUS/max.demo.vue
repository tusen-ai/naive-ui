<markdown>
# Max
</markdown>

<script lang="ts" setup>
import { NButton, useNotification } from 'naive-ui'
import { h, ref } from 'vue'

function NotificationButton() {
  const notification = useNotification()
  const index = ref(0)

  return h(
    NButton,
    {
      onClick: () => {
        index.value++
        notification.info({
          title: `Notification index: ${index.value}`,
          content: 'You can limit the index of notifications'
        })
      }
    },
    { default: () => 'Max notification count: 3' }
  )
}
</script>

<template>
  <n-notification-provider :max="3">
    <NotificationButton />
  </n-notification-provider>
</template>
