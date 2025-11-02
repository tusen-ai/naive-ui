<markdown>
# Passively activated

If you want to activate the input by pressing enter after it's focused, use `passively-activated`. Use Tab to focus on the next input(s).
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
      placeholder="Interact to trigger events"
      :passively-activated="true"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      type="textarea"
      placeholder="Interact to trigger events"
      :passively-activated="true"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <n-input
      pair
      separator="to"
      :passively-activated="true"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </n-space>
</template>
