<markdown>
# 聚焦行

它可以聚焦于一行。如果你想使用聚焦行特性，请为`hljs`添加`lineToDiv`插件。
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
        :hljs="hljs"
        :focus-line="2"
        show-line-numbers
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { lineToDiv } from 'naive-ui'

hljs.addPlugin(lineToDiv())

export default defineComponent({
  setup () {
    hljs.registerLanguage('javascript', javascript)
    return {
      cppCode: `int main () {
    std::cout << "Hello Naive UI";
    return 0;
  }`,
      hljs
    }
  }
})
</script>
