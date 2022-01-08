<markdown>
# 软换行

code 可以在溢出时自动换行。
</markdown>

<template>
  <n-code :code="code" language="js" word-wrap />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: `
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)? (string + createPadding(length - strLength, chars)): (string || '')
}
      `
    }
  }
})
</script>
