<markdown>
# Custom Action
</markdown>

<template>
  <n-space>
    <n-popconfirm v-model:show="show">
      <template #trigger>
        <n-button>Quote</n-button>
      </template>
      For example, if I were to write about elephants, I’d have had no idea what
      words to use.
      <template #action>
        <n-button size="small" @click="show = false">
          Maybe
        </n-button>
      </template>
    </n-popconfirm>
    <n-popconfirm positive-text="Oops!">
      <template #trigger>
        <n-button>Quote</n-button>
      </template>
      For example, if I were to write about elephants, I’d have had no idea what
      words to use.
    </n-popconfirm>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
