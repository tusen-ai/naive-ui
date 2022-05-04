<markdown>
# 自定义信息渲染

有些人表示特别想用 Alert 来当成 Message，当然换个别的也行。
</markdown>

<template>
  <n-button @click="handleClick">
    No Party For Cao Dong
  </n-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NAlert, useMessage } from 'naive-ui'
import type { MessageRenderMessage } from 'naive-ui'

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === 'loading' ? 'default' : type,
      title: '你看你手上拿的是什么啊',
      style: {
        boxShadow: 'var(--n-box-shadow)',
        maxWidth: 'calc(100vw - 32px)',
        width: '480px'
      }
    },
    {
      default: () => props.content
    }
  )
}

export default defineComponent({
  setup () {
    const { error } = useMessage()
    function handleClick () {
      error('那东西我们早就不屑啦，哈哈哈', {
        render: renderMessage,
        closable: true
      })
    }
    return {
      handleClick
    }
  }
})
</script>
