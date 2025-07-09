<markdown>
# 只允许输入特定值

使用 `allow-input` 限制输入框的输入格式，你可以使用它来达到 `trim` 的效果。
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
function noSideSpace(value: string) {
  return !value.startsWith(' ') && !value.endsWith(' ')
}
</script>

<template>
  <n-space vertical>
    <n-input
      type="text"
      :allow-input="onlyAllowNumber"
      placeholder="只能输入数字"
    />
    <n-input
      type="textarea"
      :allow-input="noSideSpace"
      placeholder="没有前后空格"
    />
  </n-space>
</template>
