<markdown>
# Unclosable

You can make it unclosable.
</markdown>

<template>
  <n-button @click="handleClick">
    Unclosable
  </n-button>
</template>

<script lang="ts">
import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        notification.create({
          title: 'Close Me if You Can',
          duration: 2000,
          closable: false,
          onAfterLeave: () => {
            notification.create({
              title: 'Ha Ha Ha Ha!',
              duration: 2000,
              closable: false,
              onAfterLeave: () => {
                notification.create({
                  title: "No, You Can't",
                  duration: 2000,
                  closable: false
                })
              }
            })
          }
        })
      }
    }
  }
})
</script>
