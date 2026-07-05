<markdown>
# 被动激活

如果需要在 focus 之后使用回车键来激活输入，可以设定 `passively-activated`。 (使用 tab 键来聚焦这些输入)
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
      placeholder="操作来触发事件"
      passively-activated
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      type="textarea"
      placeholder="操作来触发事件"
      passively-activated
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      pair
      separator="to"
      passively-activated
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </n-space>
</template>
