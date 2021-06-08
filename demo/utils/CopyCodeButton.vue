<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    @click="handleClick"
    :depth="depth"
  >
    <template #icon>
      <n-icon>
        <copy-icon />
      </n-icon>
    </template>
  </n-button>
</template>

<script>
import CopyIcon from '@vicons/fluent/Copy24Regular.js'
import copy from 'copy-text-to-clipboard'
import { useMessage } from 'naive-ui'

export default {
  name: 'CopyCodeButton',
  components: {
    CopyIcon
  },
  props: {
    code: {
      type: String,
      required: true
    },
    successText: {
      type: String,
      required: true
    },
    text: Boolean,
    size: String,
    depth: String
  },
  setup (props) {
    const message = useMessage()

    return {
      handleClick () {
        copy(props.code)
        message.success(props.successText)
      }
    }
  }
}
</script>
