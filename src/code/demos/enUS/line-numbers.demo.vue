<markdown>
# Line Numbers

It can show line numbers in the code block.
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
  cout << "It is always morning somewhere in the world." << endl;
  return 0;
}`
    }
  }
})
</script>
