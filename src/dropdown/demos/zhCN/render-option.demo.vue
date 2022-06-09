<markdown>
# 为选项增加 Tooltip

你可以通过 `render-option` 为选项增添 Tooltip。
</markdown>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    :render-option="renderOption"
    @select="handleSelect"
  >
    <n-button>找个地方休息</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent, h, VNode } from 'vue'
import {
  useMessage,
  NTooltip,
  DropdownOption,
  DropdownGroupOption
} from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      renderOption: ({
        node,
        option
      }: {
        node: VNode
        option: DropdownOption | DropdownGroupOption
      }) => {
        return h(
          NTooltip,
          { keepAliveOnHover: false, style: { width: 'max-content' } },
          {
            trigger: () => [node],
            default: () => option.key
          }
        )
      },
      options: [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands',
          disabled: true
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london"
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          key: 'the beverly hills hotel, los angeles'
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
