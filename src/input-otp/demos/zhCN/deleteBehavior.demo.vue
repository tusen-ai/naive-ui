<markdown>
# 删除行为

用于设定按下 Backspace 键时的删除行为，支持以下两种模式：

- delAndMove：删除当前字符并将光标移动到前一个字符
- delThenMove：有值时只删除当前字符，无值时光标移动到前一个字符
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321'.split(''))
const value2 = ref('654321'.split(''))
</script>

<template>
  <n-space vertical>
    delAndMove
    <n-input-otp v-model:value="value" />

    delThenMove
    <n-input-otp v-model:value="value2" delete-behavior="delThenMove" />
  </n-space>
</template>
