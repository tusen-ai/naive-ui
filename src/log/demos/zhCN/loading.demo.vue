<markdown>
# 加载
</markdown>

<template>
  <n-switch v-model:value="loading" /> <n-log :loading="loading" :log="log" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function log () {
  const l: string[] = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default defineComponent({
  setup () {
    return {
      loading: ref(false),
      log: ref(log())
    }
  }
})
</script>
