<markdown>
# Limit input format

Use `allow-input` to limit input value to desired format.
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
const onlyAllowEnglish = (value: string) => !value || /^[a-zA-Z]+$/.test(value)
</script>

<template>
  <n-space vertical>
    Only allow number input
    <n-input-otp :allow-input="onlyAllowNumber" />
    Only allow character input
    <n-input-otp :allow-input="onlyAllowEnglish" />
  </n-space>
</template>
