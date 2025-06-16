<markdown>
# 基础用法

字符数由 `length` 选项定义，默认情况下设置为 `6`。
</markdown>

<script lang="ts" setup>
import type { InputOtpOnUpdateValue } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const value = ref('654321'.split(''))
const onFocus = () => message.info('focus')
const onBlur = () => message.info('blur')
const onFinish = () => message.info('finish')
const onUpdateValue: InputOtpOnUpdateValue = value =>
  message.info(JSON.stringify(value))
</script>

<template>
  <n-input-otp
    v-model:value="value"
    @focus="onFocus"
    @blur="onBlur"
    @finish="onFinish"
    @update:value="onUpdateValue"
  />
</template>
