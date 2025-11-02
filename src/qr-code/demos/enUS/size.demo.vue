<markdown>
  # Size
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('The rain dampened the sky')

const size = ref(110)

function add() {
  size.value += 10
  if (size.value > 200) {
    size.value = 110
  }
}

function minus() {
  size.value -= 10
  if (size.value < 20) {
    size.value = 110
  }
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="minus">
        Minus 10px
      </n-button>
      <n-button @click="add">
        Add 10px
      </n-button>
    </n-space>
    <n-qr-code :value="text" :size="size" />
  </n-space>
</template>
