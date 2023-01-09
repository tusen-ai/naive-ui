<markdown>
  # 渐变色

  你或许想要不用颜色的组合。
  </markdown>

<template>
  <n-space vertical>
    <n-progress
      type="line"
      :percentage="percentage"
      :show-indicator="false"
      :color="{ form: 'white', to: 'orange' }"
    />
    <n-progress
      type="line"
      :percentage="percentage"
      :show-indicator="false"
      :color="{ form: 'orange', to: 'pink' }"
    />
    <n-space>
      <n-progress
        type="circle"
        :percentage="percentage"
        :color="{ form: 'pink', to: 'red' }"
      />
      <n-progress
        style="width: 120px; margin: 0 8px 12px 0"
        type="multiple-circle"
        :stroke-width="10"
        :circle-gap="10"
        :percentage="[80, 70]"
        :color="[
          { form: 'orange', to: 'pink' },
          { form: 'pink', to: 'red' }
        ]"
        :rail-color="[
          changeColor(themeVars.infoColor, { alpha: 0.2 }),
          changeColor(themeVars.infoColor, { alpha: 0.2 })
        ]"
      />
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'

export default defineComponent({
  setup () {
    const percentageRef = ref(80)

    return {
      percentage: percentageRef,
      themeVars: useThemeVars(),
      changeColor
    }
  }
})
</script>
