<markdown>
# Scroll to latest

Scroll to the latest when log is gradually increasing.
</markdown>

<template>
  <n-space vertical>
    <n-button @click="handleClick">
      Add Data
    </n-button>
    <n-log ref="logInst" :log="log" language="naive-log" trim />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, nextTick } from 'vue'
import { LogInst } from 'naive-ui'

function log () {
  const l: string[] = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default defineComponent({
  setup () {
    const logRef = ref(log())
    const logInstRef = ref<LogInst | null>(null)
    const startRef = ref(false)
    const timerRef = ref<number | null>(null)
    const handleClick = () => {
      startRef.value = !startRef.value
      if (startRef.value) {
        timerRef.value = window.setInterval(() => {
          logRef.value = logRef.value + log()
        }, 1000)
      } else if (timerRef.value) {
        clearInterval(timerRef.value)
        timerRef.value = null
      }
    }
    onMounted(() => {
      watchEffect(() => {
        if (logRef.value) {
          nextTick(() => {
            logInstRef.value?.scrollTo({ position: 'bottom', silent: true })
          })
        }
      })
    })

    return {
      log: logRef,
      logInst: logInstRef,
      handleClick
    }
  }
})
</script>
