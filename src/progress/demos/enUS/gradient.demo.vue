<markdown>
# Linear Gradient

You may want to use color combinations.
</markdown>

<script lang="ts" setup>
import { useThemeVars } from 'naive-ui'
import { changeColor } from 'seemly'
import { ref } from 'vue'

const percentage = ref(80)
const themeVars = useThemeVars()
</script>

<template>
  <n-flex vertical>
    <n-progress
      type="line"
      :percentage="percentage"
      :show-indicator="false"
      :color="{ stops: ['white', 'pink'] }"
    />
    <n-flex>
      <n-progress
        type="circle"
        :percentage="percentage"
        :color="{ stops: ['#E3F2FD', '#2080f0'] }"
      />
      <n-progress
        style="width: 120px; margin: 0 8px 12px 0"
        type="multiple-circle"
        :stroke-width="10"
        :circle-gap="10"
        :percentage="[80, 70]"
        :color="[
          { stops: ['white', '#18a058'] },
          { stops: ['#E3F2FD', '#2080f0'] },
        ]"
        :rail-color="[
          changeColor(themeVars.infoColor, { alpha: 0.2 }),
          changeColor(themeVars.infoColor, { alpha: 0.2 }),
        ]"
      />
    </n-flex>
  </n-flex>
</template>
