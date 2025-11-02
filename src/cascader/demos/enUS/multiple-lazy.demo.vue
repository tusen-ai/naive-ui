<markdown>
# Multiple (async)
</markdown>

<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import { ref } from 'vue'

function getChildren(option: CascaderOption) {
  const children = []
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    children.push({
      label: `${option.label}-${i}`,
      value: `${option.label}-${i}`,
      depth: (option as { depth: number }).depth + 1,
      isLeaf: option.depth === 3
    })
  }
  return children
}

const checkStrategy = ref<'all' | 'parent' | 'child'>('all')
const allowCheckingNotLoaded = ref(false)
const cascade = ref(true)
const showPath = ref(true)
const value = ref(null)
const options = ref([
  {
    label: 'l-0',
    value: 'v-0',
    depth: 1,
    isLeaf: false
  }
])

function handleLoad(option: CascaderOption) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      option.children = getChildren(option)
      resolve()
    }, 1000)
  })
}
</script>

<template>
  <n-space vertical>
    <n-space align="center">
      <n-radio-group v-model:value="checkStrategy">
        <n-radio-button value="all">
          All
        </n-radio-button>
        <n-radio-button value="parent">
          Parent
        </n-radio-button>
        <n-radio-button value="child">
          Child
        </n-radio-button>
      </n-radio-group>
      <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
      <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
      <n-space>
        <n-switch v-model:value="allowCheckingNotLoaded" />Allow Checking Not
        Loaded
      </n-space>
    </n-space>
    <n-cascader
      v-model:value="value"
      multiple
      placeholder="Meaningless values"
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategy"
      :show-path="showPath"
      :allow-checking-not-loaded="allowCheckingNotLoaded"
      remote
      :on-load="handleLoad"
    />
  </n-space>
</template>
