<markdown>
# 输入成对值
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
const placeholder: string | [string, string] | undefined = ['从', '到']

function handleInputBlur() {
  message.info('输入成对值：Blur')
}

function handleInputFocus() {
  message.info('输入成对值：Focus')
}

function handleInputInput() {
  message.info('输入成对值：Input')
}

function handleInputChange() {
  message.info('输入成对值：Change')
}
</script>

<template>
  <n-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @blur="handleInputBlur"
    @focus="handleInputFocus"
    @change="handleInputChange"
    @update:value="handleInputInput"
  />
</template>
