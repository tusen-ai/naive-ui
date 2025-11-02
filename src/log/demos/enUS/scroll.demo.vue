<markdown>
# Scroll

You can easily make log scroll to top or bottom. Also you can make the scroll action silent (don't trigger events of Log in this scroll action).
</markdown>

<script lang="ts" setup>
import type { LogInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

function log() {
  const l: string[] = []
  for (let i = 0; i < 10; ++i) {
    l.push(Math.random().toString(16))
  }
  return `${l.join('\n')}\n`
}

const message = useMessage()
const loadingRef = ref(false)
const logRef = ref(log())
const logInstRef = ref<LogInst | null>(null)

function handleRequireMore(from: 'top' | 'bottom') {
  message.info(`Require More from ${from}`)
  if (loadingRef.value)
    return
  loadingRef.value = true
  setTimeout(() => {
    if (from === 'top') {
      logRef.value = log() + logRef.value
    }
    else if (from === 'bottom') {
      logRef.value = logRef.value + log()
    }
    loadingRef.value = false
  }, 1000)
}

function handleReachTop() {
  message.info('Reach Top')
}

function handleReachBottom() {
  message.info('Reach Bottom')
}

function scrollTo(options: { position: 'bottom' | 'top', silent: boolean }) {
  logInstRef.value?.scrollTo(options)
}
</script>

<template>
  <n-space vertical>
    <n-button-group>
      <n-button @click="scrollTo({ position: 'bottom', silent: false })">
        Scroll To Bottom
      </n-button>
      <n-button @click="scrollTo({ position: 'bottom', silent: true })">
        Scroll To Bottom (silent)
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: false })">
        Scroll To Top
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: true })">
        Scroll To Top (silent)
      </n-button>
    </n-button-group>
    <n-log
      ref="logInstRef"
      :log="logRef"
      :loading="loadingRef"
      trim
      @require-more="handleRequireMore"
      @reach-top="handleReachTop"
      @reach-bottom="handleReachBottom"
    />
  </n-space>
</template>
