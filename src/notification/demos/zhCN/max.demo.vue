<markdown>
# 限制数量

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
