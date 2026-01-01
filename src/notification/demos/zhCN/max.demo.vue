<markdown>
# 限制数量
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
          title: `通知框序号: ${index.value}`,
          content: '你可以限制通知框的数量'
        })
      }
    },
    { default: () => '最多允许 3 个通知' }
  )
}
</script>

<template>
  <n-notification-provider :max="3">
    <NotificationButton />
  </n-notification-provider>
</template>
