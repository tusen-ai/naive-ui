<markdown>
# 手动 Focus & Blur

可能你想要手动 `focus` 和 `blur`。
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
    label: '广东路',
    value: '广东路'
  },
  {
    label: (option: MentionOption): VNodeChild =>
      h('div', { style: 'display: flex; align-items: center;' }, [
        h(
          NIcon,
          { style: 'margin-right: 5px' },
          { default: () => h(HomeIcon) }
        ),
        option.value
      ]),
    value: '颐和园路5号'
  }
]
</script>

<template>
  <n-space>
    <n-mention ref="myMention" :options="options" default-value="@" />
    <n-button @click="triggerFocus">
      点击聚焦，一秒后失去焦点
    </n-button>
  </n-space>
</template>
