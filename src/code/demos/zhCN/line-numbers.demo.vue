<markdown>
# 显示行号

可以在代码块左侧显示行号。
</markdown>

<template>
  <div style="overflow: auto">
    <n-code :code="code" language="cpp" show-line-numbers />
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
  cout <<"你" << endl;
  cout <<"觉" << endl;
  cout <<"得" << endl;
  cout <<"恨" << endl;
  cout <<"却" << endl;
  cout <<"离" << endl;
  cout <<"不" << endl;
  cout <<"开" << endl;
  return 0;
}`
    }
  }
})
</script>
