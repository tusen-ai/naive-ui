<markdown>
# 基础用法

使用 `useDiscreteApi` 来创建一系列 API。
</markdown>

<template>
  <n-space>
    <n-button @click="handleMessageTriggerClick">
      message
    </n-button>
    <n-button @click="handleNotificationTriggerClick">
      notification
    </n-button>
    <n-button @click="handleDialogTriggerClick">
      dialog
    </n-button>
    <n-button @click="handleLoadingBarTriggerClick">
      loadingBar
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createDiscreteApi } from 'naive-ui'

const { message, notification, dialog, loadingBar } = createDiscreteApi()

export default defineComponent({
  setup () {
    return {
      handleMessageTriggerClick () {
        message.info('Message')
      },
      handleNotificationTriggerClick () {
        notification.create({ title: 'Notification' })
      },
      handleDialogTriggerClick () {
        dialog.info({ title: 'Dialog' })
      },
      handleLoadingBarTriggerClick () {
        loadingBar.start()
        setTimeout(() => {
          loadingBar.finish()
        }, 1000)
      }
    }
  }
})
</script>
