<markdown>
# 手动 Focus & Blur

可能你想要手动 `focus` 和 `blur`。
</markdown>

<template>
  <n-space>
    <n-mention ref="myMention" :options="options" default-value="@" />
    <n-button @click="triggerFocus">
      点击聚焦，一秒后失去焦点
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, VNodeChild } from 'vue'
import { NIcon, MentionOption, MentionInst } from 'naive-ui'
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    const myMentionRef = ref<MentionInst | null>(null)
    const triggerFocus = () => {
      myMentionRef.value?.focus()
      setTimeout(triggerBlur, 1000)
    }
    const triggerBlur = () => {
      myMentionRef.value?.blur()
    }
    return {
      myMention: myMentionRef,
      triggerFocus,
      triggerBlur,
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
    }
  }
})
</script>
