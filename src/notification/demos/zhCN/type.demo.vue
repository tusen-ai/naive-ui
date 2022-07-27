<markdown>
# 类型
</markdown>

<template>
  <n-space>
    <n-button @click="notify('info')">
      信息
    </n-button>
    <n-button @click="notify('success')">
      成功
    </n-button>
    <n-button @click="notify('warning')">
      警告
    </n-button>
    <n-button @click="notify('error')">
      错误
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
          content: '说点啥呢',
          meta: '想不出来',
          duration: 2500,
          keepAliveOnHover: true
        })
      }
    }
  }
})
</script>
