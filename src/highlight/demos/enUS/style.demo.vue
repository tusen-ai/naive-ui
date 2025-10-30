<markdown>
# Style

Change the style to make the highlight more striking.
</markdown>

<script lang="ts" setup>
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const text
  = 'Naive UI is written in full TypeScript and works seamlessly with your TypeScript projects'
const patterns = ['Naive UI', 'typeScript']
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
