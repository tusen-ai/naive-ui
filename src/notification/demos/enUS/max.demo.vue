<markdown>
# Max
</markdown>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { NButton, useNotification } from 'naive-ui'

const NotificationButton = defineComponent({
  setup() {
    const notification = useNotification()
    const index = ref(0)
    return {
      notification,
      index
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.index++
          this.notification.info({
            title: `Notification index: ${this.index}`,
            content: 'You can limit the index of notifications'
          })
        }
      },
      { default: () => 'Max notification count: 3' }
    )
  }
})

export default defineComponent({
  components: {
    NotificationButton
  }
})
</script>

<template>
  <n-notification-provider :max="3">
    <NotificationButton />
  </n-notification-provider>
</template>
