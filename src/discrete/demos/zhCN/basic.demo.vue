<markdown>
# 基础用法

使用 `createDiscreteApi` 来创建一系列 API。
</markdown>

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
  </n-space>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  createDiscreteApi,
  ConfigProviderProps,
  darkTheme,
  lightTheme
} from 'naive-ui'

const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)

export default defineComponent({
  setup () {
    return {
      theme: themeRef,
      handleThemeChangeClick () {
        if (themeRef.value === 'light') themeRef.value = 'dark'
        else themeRef.value = 'light'
      },
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
