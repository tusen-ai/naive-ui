<markdown>
# Basic usage

If `label` is a render function, the `value` property will be used for matching.
</markdown>

<template>
  <n-mention :options="options" default-value="@" />
</template>

<script lang="ts">
import { defineComponent, h, VNodeChild } from 'vue'
import { NIcon, MentionOption } from 'naive-ui'
import { TelescopeOutline } from '@vicons/ionicons5'

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
          label: 'Guandong-Road',
          value: 'Guandong-Road'
        },
        {
          label: (option: MentionOption): VNodeChild =>
            h('span', { style: 'display: flex; align-items: center;' }, [
              h(NIcon, {
                style: 'margin-right: 6px',
                size: 18,
                component: TelescopeOutline
              }),
              option.value
            ]),
          value: 'No.5-Yiheyuan-Road'
        }
      ]
    }
  }
})
</script>
