<markdown>
# Highlight line

It can highlight lines.If you want to use focus line feature, please add `lineToDiv` plugin to `hljs`.
</markdown>
<template>
  <div style="overflow: auto">
    <n-space vertical :size="16">
      <n-code
        :code="`
      function sleep (ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}`"
        language="javascript"
        :highlight-lines="[2]"
        show-line-numbers
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      cppCode: `int main () {
        std::cout << "Hello Naive UI";
        return 0;
      }`
    }
  }
})
</script>
