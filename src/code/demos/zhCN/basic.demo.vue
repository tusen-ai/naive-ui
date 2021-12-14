<markdown>
# 基础用法

JavaScript、Python、C++ 的例子。
</markdown>

<template>
  <div style="overflow: auto">
    <n-space vertical :size="16">
      <n-code
        :code="`
function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
`"
        language="javascript"
      />
      <n-code
        :code="`
def say_hello():
    print('Hello Naive UI')
`"
        language="python"
      />
      <n-code :code="cppCode" language="cpp" />
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
