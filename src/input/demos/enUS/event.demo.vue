<markdown>
# Events
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleFocus() {
        message.info('[Event focus]')
      },
      handleBlur() {
        message.info('[Event blur]')
      },
      handleChange(v: string) {
        message.info(`[Event change]: ${v}`)
      },
      handleKeyUp() {
        message.info('[Event keyup]')
      },
      handleInput(v: string) {
        message.info(`[Event input]: ${v}`)
      }
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-input
      placeholder="Interact to trigger events"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      type="textarea"
      placeholder="Interact to trigger events"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
  </n-space>
</template>
