<markdown>
# 自定义选项属性

爱绑啥绑啥。
</markdown>

<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>找个地方休息</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options: [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands',
          props: {
            onClick: () => {
              message.success('Good!')
            }
          }
        },
        {
          label: '布朗酒店，伦敦',
          key: "brown's hotel, london",
          children: [
            {
              label: '鸡肉',
              key: 'chicken',
              disabled: true,
              props: {
                onClick: () => {
                  message.info('Okay')
                }
              }
            },
            {
              label: '牛肉',
              key: 'beef'
            }
          ]
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau',
          props: {
            onMousedown: () => {
              message.warning('Key down')
            }
          }
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
