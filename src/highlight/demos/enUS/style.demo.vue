<markdown>
# Style

Change the style to make the highlight more striking.
</markdown>

<script lang="ts">
import { useThemeVars } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const themeVars = useThemeVars()
    return {
      text: 'Naive UI is written in full TypeScript and works seamlessly with your TypeScript projects',
      patterns: ['Naive UI', 'typeScript'],
      themeVars
    }
  }
})
</script>

<template>
  <n-highlight
    :text="text"
    :patterns="patterns"
    :highlight-style="{
      padding: '0 6px',
      borderRadius: themeVars.borderRadius,
      display: 'inline-block',
      color: themeVars.baseColor,
      background: themeVars.primaryColor,
      transition: `all .3s ${themeVars.cubicBezierEaseInOut}`,
    }"
  />
</template>
