<markdown>
# 菜单内容很长

将 `label` 设为渲染函数，结合 `n-ellipsis`。
</markdown>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import { NEllipsis } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const options: MenuOption[] = [
      {
        label: () =>
          h(NEllipsis, null, { default: () => '电灯熄灭 物换星移 泥牛入海' }),
        key: '1'
      },
      {
        label: () =>
          h(NEllipsis, null, { default: () => '黑暗好像 一颗巨石 按在胸口' }),
        key: '2'
      }
    ]
    return {
      options
    }
  }
})
</script>

<template>
  <n-menu :options="options" style="width: 180px" default-value="1" />
</template>
