<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { NButton, unstableMessageRtl, useMessage } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

const MessageButton = defineComponent({
  setup() {
    const message = useMessage()
    return {
      message
    }
  },
  render() {
    return h(
      NButton,
      {
        onClick: () => {
          this.message.info(
            'I don\'t know why nobody told you how to unfold your love',
            {
              closable: true,
              duration: 0
            }
          )
        }
      },
      { default: () => 'Show some message' }
    )
  }
})

export default defineComponent({
  components: {
    MessageButton
  },
  setup() {
    return {
      rtlEnabled: ref(true),
      rtlStyles: [unstableMessageRtl]
    }
  }
})
</script>

<template>
  <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
  <n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-message-provider>
        <MessageButton />
      </n-message-provider>
    </n-config-provider>
  </n-space>
</template>
