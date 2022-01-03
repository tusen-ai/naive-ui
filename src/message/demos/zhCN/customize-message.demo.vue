<markdown>
# 自定义信息渲染

有些人表示特别想用 Alert 来当成 Message，当然换个别的也行。
</markdown>

<template>
  <n-message-provider
    :render-message="renderMessage"
    :theme-overrides="{ margin: '0 0 12px 0' }"
  >
    <message-trigger />
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { NAlert, NButton, useMessage } from 'naive-ui'
import type { MessageProviderRenderMessage } from 'naive-ui'

const MessageTrigger = {
  setup () {
    const { error } = useMessage()
    return () =>
      h(
        NButton,
        {
          onClick: () => {
            error('那东西我们早就不屑啦，哈哈哈', { closable: true })
          }
        },
        {
          default: () => 'No Party For Cao Dong'
        }
      )
  }
}

export default defineComponent({
  components: { MessageTrigger },
  setup () {
    const renderMessage: MessageProviderRenderMessage = (props) => {
      const { type } = props
      return h(
        NAlert,
        {
          closable: props.closable,
          onClose: props.onClose,
          type: type === 'loading' ? 'default' : type,
          title: '你看你手上拿的是什么啊',
          onMouseenter: props.onMouseenter,
          onMouseleave: props.onMouseleave,
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
    return {
      renderMessage
    }
  }
})
</script>
