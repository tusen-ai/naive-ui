<markdown>
# Deletion Behavior

Used to set the deletion behavior when the Backspace key is pressed, supporting the following two modes:

- delAndMove：Delete the current character and move the cursor to the previous character.
- delThenMove：Delete the current character if it has a value, otherwise move the cursor to the previous character.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321'.split(''))
const value2 = ref('654321'.split(''))
</script>

<template>
  <n-space vertical>
    delAndMove
    <n-input-otp v-model:value="value" />

    delThenMove
    <n-input-otp v-model:value="value2" delete-behavior="delThenMove" />
  </n-space>
</template>
