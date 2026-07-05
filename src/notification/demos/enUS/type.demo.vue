<markdown>
# Type
</markdown>

<script lang="ts" setup>
import type { NotificationType } from 'naive-ui'
import { useNotification } from 'naive-ui'

const notification = useNotification()

function notify(type: NotificationType) {
  notification[type]({
    content: 'What to say?',
    meta: 'I don\'t know',
    duration: 2500,
    keepAliveOnHover: true
  })
}
</script>

<template>
  <n-space>
    <n-button @click="notify('info')">
      Info
    </n-button>
    <n-button @click="notify('success')">
      Success
    </n-button>
    <n-button @click="notify('warning')">
      Warning
    </n-button>
    <n-button @click="notify('error')">
      Error
    </n-button>
  </n-space>
</template>
