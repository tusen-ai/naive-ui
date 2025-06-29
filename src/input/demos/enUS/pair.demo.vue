<markdown>
# Pairwise value
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
const placeholder: string | [string, string] | undefined = ['From', 'To']

function handleInputBlur() {
  message.info('Pairwise Value：Blur')
}

function handleInputFocus() {
  message.info('Pairwise Value：Focus')
}

function handleInputInput() {
  message.info('Pairwise Value：Input')
}

function handleInputChange() {
  message.info('Pairwise Value：Change')
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
