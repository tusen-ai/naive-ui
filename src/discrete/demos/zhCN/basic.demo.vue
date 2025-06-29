<markdown>
# 基础用法

使用 `createDiscreteApi` 来创建一系列 API。
</markdown>

<script lang="ts" setup>
import type { ConfigProviderProps } from 'naive-ui'
import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'
import { computed, ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: theme.value === 'light' ? lightTheme : darkTheme
}))

const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
  {
    configProviderProps: configProviderPropsRef
  }
)

function handleThemeChangeClick() {
  if (theme.value === 'light')
    theme.value = 'dark'
  else theme.value = 'light'
}

function handleMessageTriggerClick() {
  message.info('Message')
}

function handleNotificationTriggerClick() {
  notification.create({ title: 'Notification' })
}

function handleDialogTriggerClick() {
  dialog.info({ title: 'Dialog' })
}

function handleModalTriggerClick() {
  modal.create({
    preset: 'card',
    title: 'Modal'
  })
}

function handleLoadingBarTriggerClick() {
  loadingBar.start()
  setTimeout(() => {
    loadingBar.finish()
  }, 1000)
}
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
