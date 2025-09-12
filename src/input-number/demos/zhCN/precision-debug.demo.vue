<markdown>
# precision debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const v = ref(1)

function check() {
  if (v.value === null) {
    v.value = 1
  }
}
</script>

<template>
  <n-input-number v-model:value="v" :precision="0" @blur="check" />
</template>
