<markdown>
# Basic usage

If `label` is a render function, the `value` property will be used for matching.
</markdown>

<script lang="ts" setup>
import type { MentionOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { TelescopeOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

const options = [
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
</script>

<template>
  <n-mention :options="options" default-value="@" />
</template>
