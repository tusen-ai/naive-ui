<markdown>
# Content Scrollable

When using the Card preset, enable `content-scrollable` to keep scrolling inside the content area only. The header and footer stay fixed.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    Open
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="Content Scrollable"
    content-scrollable
    :style="{ width: '600px', height: '400px' }"
    :segmented="{ content: true, footer: true }"
  >
    <p v-for="i in 30" :key="i" style="margin: 0 0 8px 0">
      Line {{ i }} — only this area scrolls.
    </p>
    <template #footer>
      Fixed footer area
    </template>
  </n-modal>
</template>
