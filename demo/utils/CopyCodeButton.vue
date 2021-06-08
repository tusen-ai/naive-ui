<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    @click="handleClick"
    :depth="depth"
  >
    <template #icon>
      <n-icon size="14">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-32 -32 544 544">
          <rect
            x="128"
            y="128"
            width="336"
            height="336"
            rx="57"
            ry="57"
            style="
              fill: none;
              stroke: currentcolor;
              stroke-linejoin: round;
              stroke-width: 32px;
            "
          ></rect>
          <path
            d="M383.5,128l.5-24a56.16,56.16,0,0,0-56-56H112a64.19,64.19,0,0,0-64,64V328a56.16,56.16,0,0,0,56,56h24"
            style="
              fill: none;
              stroke: currentcolor;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 32px;
            "
          ></path>
        </svg>
      </n-icon>
    </template>
  </n-button>
</template>

<script>
import { useMessage } from 'naive-ui'
import copyTextToClipboard from './copy-text'
export default {
  name: 'CopyCodeButton',
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
        copyTextToClipboard(props.code)
        message.success(props.successText)
      }
    }
  }
}
</script>
