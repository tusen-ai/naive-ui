<markdown>
# Imperative handle

 Focus. Blur. Selection. Scroll.
</markdown>

<template>
  <n-space vertical>
    <n-space>
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
    <n-input
      ref="inputInstRef"
      v-model:value="inputValue"
      type="textarea"
      :rows="3"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { InputInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const inputInstRef = ref<InputInst | null>(null)
    return {
      inputInstRef,
      inputValue: ref("I heard you're going to select all?\n".repeat(4)),
      handleFocus () {
        inputInstRef.value?.focus()
      },
      handleBlur () {
        inputInstRef.value?.blur()
      },
      handleSelect () {
        inputInstRef.value?.select()
      },
      handleScrollEnd () {
        inputInstRef.value?.scrollTo({
          behavior: 'smooth',
          top: inputInstRef.value?.textareaElRef?.scrollHeight
        })
      }
    }
  }
})
</script>
