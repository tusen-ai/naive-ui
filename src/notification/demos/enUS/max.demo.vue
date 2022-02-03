<markdown>
# Max

</markdown>

<template>
  <n-notification-provider :max="3">
    <notification-button />
  </n-notification-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useNotification, NButton } from 'naive-ui'

const NotificationButton = defineComponent({
  setup () {
    const notification = useNotification()
    const index = ref(0)
    return {
      notification,
      index
    }
  },
  render () {
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
