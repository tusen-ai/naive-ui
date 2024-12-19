<markdown>
# 基础用法

使用 `createDiscreteApi` 来创建一系列 API。
</markdown>

<script lang="ts">
import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'

const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
  {
    configProviderProps: configProviderPropsRef
  }
)

export default defineComponent({
  setup() {
    return {
      theme: themeRef,
      handleThemeChangeClick() {
        if (themeRef.value === 'light')
          themeRef.value = 'dark'
        else themeRef.value = 'light'
      },
      handleMessageTriggerClick() {
        message.info('Message')
      },
      handleNotificationTriggerClick() {
        notification.create({ title: 'Notification' })
      },
      handleDialogTriggerClick() {
        dialog.info({ title: 'Dialog' })
      },
      handleModalTriggerClick() {
        modal.create({
          preset: 'card',
          title: 'Modal'
        })
      },
      handleLoadingBarTriggerClick() {
        loadingBar.start()
        setTimeout(() => {
          loadingBar.finish()
        }, 1000)
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-button @click="handleThemeChangeClick">
      theme: {{ theme }}
    </n-button>
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
    <n-button @click="handleModalTriggerClick">
      modal
    </n-button>
  </n-space>
</template>
