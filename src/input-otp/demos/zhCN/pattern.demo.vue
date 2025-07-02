<markdown>
# 只允许输入特定值

使用 `allow-input` 限制输入框输入的内容。
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
const onlyAllowEnglish = (value: string) => !value || /^[a-zA-Z]+$/.test(value)
</script>

<template>
  <n-space vertical>
    只允许数字输入
    <n-input-otp :allow-input="onlyAllowNumber" />
    只允许英文字母输入
    <n-input-otp :allow-input="onlyAllowEnglish" />
  </n-space>
</template>
