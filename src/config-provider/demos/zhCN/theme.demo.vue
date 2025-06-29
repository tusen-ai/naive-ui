<markdown>
# 主题

设置 `n-config-provider` 内部组件的主题。
</markdown>

<script lang="ts" setup>
import type { GlobalTheme } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { ref } from 'vue'

const theme = ref<GlobalTheme | null>(null)
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">
          深色
        </n-button>
        <n-button @click="theme = null">
          浅色
        </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>
