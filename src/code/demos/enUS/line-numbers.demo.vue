<markdown>
# Line numbers

It can show line numbers in the code block.
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
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  cout <<"\\n" <<endl;
  return 0;
}`
    }
  }
})
</script>
