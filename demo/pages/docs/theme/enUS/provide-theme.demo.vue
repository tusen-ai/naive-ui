<markdown>
# Provide Theme

Use `n-config-provider` to set the theme of all its descendant components.
</markdown>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

const theme = ref<typeof darkTheme | null>(null)
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">
          Dark
        </n-button>
        <n-button @click="theme = null">
          Light
        </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>
