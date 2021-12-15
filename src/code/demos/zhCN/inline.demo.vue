<markdown>
# 行内显示

JavaScript 的例子。
</markdown>

<template>
  <div>
    JavaScript
    <n-code :code="code" language="javascript" inline />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: 'console.log("工具人的日子不好过")'
    }
  }
})
</script>
