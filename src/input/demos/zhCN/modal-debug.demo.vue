<markdown>
 # Modal debug
</markdown>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const name = ref('')
const value = ref('')
const showModal = ref(false)

onMounted(() => {
  setInterval(() => {
    name.value = Math.random().toString()
  }, 100)
})

function renderCount() {
  return `${value.value.length} / Max`
}
</script>

<template>
  <div>
    <n-button @click="showModal = true">
      Display
    </n-button>
  </div>

  <n-modal v-model:show="showModal">
    <div>
      <div>{{ name }}</div>
      <n-input v-model:value="value" show-count :render-count="renderCount" />
    </div>
  </n-modal>
</template>
