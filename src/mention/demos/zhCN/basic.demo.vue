<markdown>
# 基本用法

如果 `label` 是回调函数，输入匹配则会根据 `value` 进行匹配
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
          label: '广东路',
          value: '广东路'
        },
        {
          label: (option: MentionOption): VNodeChild =>
            h('div', { style: 'display: flex; align-items: center;' }, [
              h(NIcon, {
                style: 'margin-right: 6px;',
                size: 18,
                component: TelescopeOutline
              }),
              option.value
            ]),
          value: '颐和园路5号'
        }
      ]
    }
  }
})
</script>
