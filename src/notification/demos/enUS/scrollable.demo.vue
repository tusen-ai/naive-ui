<markdown>
# Scrollable

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.
</markdown>

<template>
  <n-button @click="handleClick">
    See how it scrolls
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
        [1, 2, 3, 4, 5].forEach(() =>
          notification.create({
            title: 'Many Notifications',
            content: `Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll`
          })
        )
      }
    }
  }
})
</script>
