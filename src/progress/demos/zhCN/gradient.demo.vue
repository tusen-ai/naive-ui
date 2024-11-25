<markdown>
# 渐变色

你或许想要不用颜色的组合。
</markdown>

<script lang="ts">
import { useThemeVars } from 'naive-ui'
import { changeColor } from 'seemly'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const percentageRef = ref(80)
    return {
      percentage: percentageRef,
      themeVars: useThemeVars(),
      changeColor
    }
  }
})
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
