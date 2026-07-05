export const playgroundUrl = 'https://play-naive.pro-components.cn'
export const appCode = `<template>
  <n-config-provider>
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <n-dialog-provider>
              <Demo />
            </n-dialog-provider>
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import Demo from './Demo.vue'
</script>
`
