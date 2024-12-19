<markdown>
# Customize message

Some users said that they want to use alert as message.
</markdown>

<script lang="ts">
import type { MessageRenderMessage } from 'naive-ui'
import { NAlert, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === 'loading' ? 'default' : type,
      title: 'Lorem ipsum dolor sit amet',
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
  setup() {
    const { error } = useMessage()
    function handleClick() {
      error('Lorem ipsum dolor sit amet, consectetur adipiscing elit', {
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

<template>
  <n-button @click="handleClick">
    Lpsum
  </n-button>
</template>
