<markdown>
# 事件
</markdown>

<template>
  <n-space vertical>
    <n-input
      placeholder="触发事件"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      type="textarea"
      placeholder="触发事件"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleFocus () {
        message.info('[Event focus]')
      },
      handleBlur () {
        message.info('[Event blur]')
      },
      handleChange (v: string) {
        message.info('[Event change]: ' + v)
      },
      handleKeyUp () {
        message.info('[Event keyup]')
      },
      handleInput (v: string) {
        message.info('[Event input]: ' + v)
      }
    }
  }
})
</script>
