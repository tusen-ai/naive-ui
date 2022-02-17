<markdown>
# 成组

弄个选项组。
</markdown>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    @select="handleSelect"
  >
    <n-button>里面有组</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
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
        icon () {
          return h(NIcon, null, {
            default: () => h(CashIcon)
          })
        },
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
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '其他角色',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker'
      },
      {
        label: '汤姆·布坎南',
        key: 'tom buchanan'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options,
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
