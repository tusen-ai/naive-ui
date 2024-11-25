<markdown>
# Customizing toolbar by theme variables

The default style of toolbar may not meet your demand, let's make some configuration.
</markdown>

<script lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { useThemeVars } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      imageGroupThemeOverrides: computed(() => {
        const { popoverColor, boxShadow2, textColor2, borderRadius }
          = useThemeVars().value
        const themeOverrides: NonNullable<GlobalThemeOverrides['Image']> = {
          toolbarColor: popoverColor,
          toolbarBoxShadow: boxShadow2,
          toolbarIconColor: textColor2,
          toolbarBorderRadius: borderRadius
        }
        return themeOverrides
      })
    }
  }
})
</script>

<template>
  <n-image-group :theme-overrides="imageGroupThemeOverrides">
    <n-space>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-image
        width="100"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </n-space>
  </n-image-group>
</template>
