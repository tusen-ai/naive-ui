<markdown>
# Customize color

If you are not satisfied with builtin colors.
</markdown>

<template>
  <n-progress
    style="margin: 0 8px 12px 0"
    type="circle"
    :percentage="20"
    :color="themeVars.successColor"
    :rail-color="changeColor(themeVars.successColor, { alpha: 0.2 })"
    :indicator-text-color="themeVars.successColor"
  />
  <n-progress
    style="width: 120px; margin: 0 8px 12px 0"
    type="multiple-circle"
    :stroke-width="10"
    :circle-gap="10"
    :percentage="[50, 25]"
    :color="[themeVars.infoColor, themeVars.infoColor]"
    :rail-color="[
      changeColor(themeVars.infoColor, { alpha: 0.2 }),
      changeColor(themeVars.infoColor, { alpha: 0.2 })
    ]"
  />
  <n-progress
    type="line"
    indicator-placement="inside"
    :color="themeVars.errorColor"
    :rail-color="changeColor(themeVars.errorColor, { alpha: 0.2 })"
    :percentage="20"
  />
  <n-progress
    type="line"
    :color="themeVars.warningColor"
    :rail-color="changeColor(themeVars.warningColor, { alpha: 0.2 })"
    :percentage="20"
    :indicator-text-color="themeVars.warningColor"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      changeColor,
      themeVars: useThemeVars()
    }
  }
})
</script>
