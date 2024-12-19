<markdown>
# Long label

Set `label` to render function that renders `n-ellipsis`.
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
          h(NEllipsis, null, {
            default: () =>
              'The lights are extinguished. Matter is transformed and the heavens have shifted. Clay figures vanish into the sea.'
          }),
        key: '1'
      },
      {
        label: () =>
          h(NEllipsis, null, {
            default: () =>
              'The darkness is like a boulder pressing down upon the breast.'
          }),
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
