<markdown>
# 软换行

code 可以在溢出时自动换行。
</markdown>

<script lang="ts" setup>
const code = `
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)? (string + createPadding(length - strLength, chars)): (string || '')
}
      `
</script>

<template>
  <n-code :code="code" language="js" word-wrap />
</template>
