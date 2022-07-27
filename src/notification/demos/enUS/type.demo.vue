<markdown>
# Type
</markdown>

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

<script lang="ts">
import { useNotification, NotificationType } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      notify (type: NotificationType) {
        notification[type]({
          content: 'What to say?',
          meta: "I don't know",
          duration: 2500,
          keepAliveOnHover: true
        })
      }
    }
  }
})
</script>
