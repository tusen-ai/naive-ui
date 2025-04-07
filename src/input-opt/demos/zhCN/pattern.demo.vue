<markdown>
# 只允许输入特定值

使用 allow-input 限制输入框的输入格式，你可以使用它来达到 trim 的效果。
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
function onlyAllowEnglish(value: string) {
  return !value || /^[a-zA-Z]+$/.test(value)
}
</script>

<template>
  <n-space vertical>
    Only numbers can be entered:
    <n-input-opt style="width: 300px" :allow-input="onlyAllowNumber" />
    Only `a-z` can be entered:
    <n-input-opt style="width: 300px" :allow-input="onlyAllowEnglish" />
  </n-space>
</template>
