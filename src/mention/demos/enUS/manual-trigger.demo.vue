<markdown>
# Manually trigger focus and blur

You may want to trigger `focus` and `blur` manually?
</markdown>

<template>
  <n-space>
    <n-mention ref="myMention" :options="options" default-value="@" />
    <n-button @click="triggerFocus">
      Click to focus, and will blur after one second
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
    }
  }
})
</script>
