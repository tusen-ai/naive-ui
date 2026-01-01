<markdown>
# 事件
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function handleFocus() {
  message.info('[Event focus]')
}

function handleBlur() {
  message.info('[Event blur]')
}

function handleChange(v: string) {
  message.info(`[Event change]: ${v}`)
}

function handleKeyUp() {
  message.info('[Event keyup]')
}

function handleInput(v: string) {
  message.info(`[Event input]: ${v}`)
}
</script>

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
