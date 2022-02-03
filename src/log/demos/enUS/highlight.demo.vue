<markdown>
# Highlight

Before you use highlight, see Note section of the page to make sure you won't miss messages that are important to make it work.
</markdown>

<template>
  <n-log
    :log="log"
    :loading="loading"
    language="naive-log"
    trim
    @require-top="handlerequireTop"
    @require-bottom="handlerequireBottom"
  />
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
    const loadingRef = ref(false)
    const logRef = ref(log())

    return {
      loading: loadingRef,
      log: logRef,
      handlerequireTop () {
        if (loadingRef.value) return
        loadingRef.value = true
        setTimeout(() => {
          logRef.value = log() + logRef.value
          loadingRef.value = false
        }, 1000)
      },
      handlerequireBottom () {
        if (loadingRef.value) return
        loadingRef.value = true
        setTimeout(() => {
          logRef.value = logRef.value + log()
          loadingRef.value = false
        }, 1000)
      }
    }
  }
})
</script>
