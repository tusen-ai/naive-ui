<markdown>
# 手动操作

清除、聚焦、失焦、选中、滚动。
</markdown>

<script lang="ts" setup>
import type { InputInst } from 'naive-ui'
import { ref } from 'vue'

const inputInstRef = ref<InputInst | null>(null)
const inputValue = ref('马儿乖，马儿好，马儿光跑不吃草。'.repeat(4))

function handleClear() {
  inputInstRef.value?.clear()
}

function handleFocus() {
  inputInstRef.value?.focus()
}

function handleBlur() {
  inputInstRef.value?.blur()
}

function handleSelect() {
  inputInstRef.value?.select()
}

function handleScrollEnd() {
  inputInstRef.value?.scrollTo({
    behavior: 'smooth',
    left: 10000
  })
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleClear">
        Clear
      </n-button>
      <n-button @click="handleFocus">
        Focus
      </n-button>
      <n-button :focusable="false" @click="handleBlur">
        Blur
      </n-button>
      <n-button :focusable="false" @click="handleSelect">
        Select
      </n-button>
      <n-button :focusable="false" @click="handleScrollEnd">
        ScrollToEnd
      </n-button>
    </n-space>
    <n-input ref="inputInstRef" v-model:value="inputValue" />
  </n-space>
</template>
