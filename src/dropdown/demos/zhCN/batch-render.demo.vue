<markdown>
# 批量渲染

注意：`render-label` 会对 group 类型的标签生效，可通过 `option.type` 进行设置。
</markdown>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    :render-label="renderDropdownLabel"
    :render-icon="renderDropdownIcon"
  >
    <n-button>我是批量渲染</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { VNodeChild } from 'vue'
import { NIcon } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
  {
    type: 'group',
    label: '主角和吃的',
    key: 'main',
    children: [
      {
        label: '杰·盖茨比',
        key: 'jay gatsby'
      },
      {
        label: '黛西·布坎南',
        key: 'daisy buchanan'
      },
      {
        label: '尼克·卡拉威',
        key: 'nick carraway'
      },
      {
        label: '吃的',
        key: 'food',
        children: [
          {
            label: '鸡肉',
            key: 'chicken'
          },
          {
            label: '牛肉',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      options,
      renderDropdownLabel (option: DropdownOption) {
        if (option.type === 'group') {
          return option.label as VNodeChild
        }
        return h(
          'a',
          {
            href: '',
            target: '_blank'
          },
          {
            default: () => option.label as VNodeChild
          }
        )
      },
      renderDropdownIcon () {
        return h(NIcon, null, {
          default: () => h(CashIcon)
        })
      }
    }
  }
})
</script>
