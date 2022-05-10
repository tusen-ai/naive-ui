<markdown>
# Render label

If the `option.label` property is not a string, the `option.value` property will be used for matching by default.
</markdown>

<template>
  <n-mention :options="options" :render-label="renderLabel" />
</template>

<script lang="ts">
import { defineComponent, h, VNodeChild } from 'vue'
import { NAvatar, MentionOption } from 'naive-ui'

export default defineComponent({
  setup () {
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
