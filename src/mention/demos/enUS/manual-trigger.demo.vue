<markdown>
# Manually trigger focus and blur

You may want to trigger `focus` and `blur` manually?
</markdown>

<script lang="ts" setup>
import type { MentionInst, MentionOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h, ref } from 'vue'

const myMention = ref<MentionInst | null>(null)

function triggerBlur() {
  myMention.value?.blur()
}

function triggerFocus() {
  myMention.value?.focus()
  setTimeout(triggerBlur, 1000)
}

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
        h(
          NIcon,
          { style: 'margin-right: 5px' },
          { default: () => h(HomeIcon) }
        ),
        option.value
      ]),
    value: 'No.5-Yiheyuan-Road'
  }
]
</script>

<template>
  <n-space>
    <n-mention ref="myMention" :options="options" default-value="@" />
    <n-button @click="triggerFocus">
      Click to focus, and will blur after one second
    </n-button>
  </n-space>
</template>
