<markdown>
# Render label

If the `option.label` property is not a string, the `option.value` property will be used for matching by default.
</markdown>

<script lang="ts">
import type { MentionOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { NAvatar } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    return {
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: 'star-kirby',
          value: 'star-kirby'
        },
        {
          label: 'amadeus711',
          value: 'amadeus711'
        }
      ],
      renderLabel: (option: MentionOption): VNodeChild =>
        h('div', { style: 'display: flex; align-items: center;' }, [
          h(NAvatar, {
            style: 'margin-right: 8px;',
            size: 24,
            round: true,
            src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
          option.value
        ])
    }
  }
})
</script>

<template>
  <n-mention :options="options" :render-label="renderLabel" />
</template>
