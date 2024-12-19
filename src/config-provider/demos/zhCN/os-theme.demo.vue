<markdown>
# 使用操作系统主题

Naive UI 提供 `useOsTheme` 来获取当前操作系统的主题。
</markdown>

<script lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const osThemeRef = useOsTheme()
    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }
})
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card> 当前操作系统的主题是 {{ osTheme }}。 </n-card>
  </n-config-provider>
</template>
