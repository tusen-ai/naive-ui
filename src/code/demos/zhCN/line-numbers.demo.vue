<markdown>
# 显示行号

可以在代码块左侧显示行号。
</markdown>

<template>
  <div style="overflow: auto">
    <n-code :code="code" language="cpp" line-numbers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
  cout << "最孤独的人最亲切，受过伤的人总是笑的最灿烂。" << "—— 素媛" << endl;
  return 0;
}`
    }
  }
})
</script>
