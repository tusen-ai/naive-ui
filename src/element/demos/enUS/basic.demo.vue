<markdown>
# Basic

You can use CSS variables from it. If you need to use those variables in JS, please see [useThemeVars](../docs/theme#use-theme-vars).
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="theme = darkTheme">
        Dark
      </n-button>
      <n-button @click="theme = null">
        Light
      </n-button>
    </n-space>
    <n-config-provider :theme="theme">
      <n-card>
        <n-el
          tag="span"
          style="
            color: var(--primary-color);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
          "
        >
          I am a Span.
        </n-el>
      </n-card>
    </n-config-provider>
  </n-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      darkTheme,
      theme: ref<typeof darkTheme | null>(null)
    }
  }
})
</script>
