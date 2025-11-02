<markdown>
# Scrollable

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.
</markdown>

<script lang="ts" setup>
import { useNotification } from 'naive-ui'

const notification = useNotification()

function handleClick() {
  ;[1, 2, 3, 4, 5].forEach(() =>
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
</script>

<template>
  <n-button @click="handleClick">
    See how it scrolls
  </n-button>
</template>
