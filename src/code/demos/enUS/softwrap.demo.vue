<markdown>
# soft wrap
</markdown>

<template>
  auto wrap when code is too long
  <div>
    <n-code :code="code" language="js" />
  </div>
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
