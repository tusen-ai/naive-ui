<markdown>
# Customize message

Some users said that they want to use alert as message.
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
            error('Lorem ipsum dolor sit amet, consectetur adipiscing elit', {
              closable: true
            })
          }
        },
        {
          default: () => 'Lipsum'
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
          title: 'Lorem ipsum dolor sit amet',
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
