<markdown>
# Long label

Set `label` to render function that renders `n-ellipsis`.
</markdown>

<template>
  <n-menu :options="options" style="width: 180px" default-value="1" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NEllipsis } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

export default defineComponent({
  setup () {
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
