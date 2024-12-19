<markdown>
# 限制数量
</markdown>

<script lang="ts">
import { NButton, useNotification } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

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
            title: `通知框序号: ${this.index}`,
            content: '你可以限制通知框的数量'
          })
        }
      },
      { default: () => '最多允许 3 个通知' }
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
