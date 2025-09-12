<markdown>
# 提供主题

使用 `n-config-provider` 来设定它全部的后代组件主题。
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
