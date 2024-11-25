<markdown>
# Use OS theme

Naive UI provides `useOsTheme` to get the current theme of your OS.
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
    <n-card> Your current system theme is {{ osTheme }}. </n-card>
  </n-config-provider>
</template>
