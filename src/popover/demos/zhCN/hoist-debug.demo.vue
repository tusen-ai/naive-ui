<markdown>
# Hoist Debug

</markdown>

<template>
  Style is the only prop of button and it's static, so the props of button vNode
  is hoisted. Every button shares the same vNode props. // Remove key on debug
  <n-popselect v-for="i in 3" :key="i" :options="options">
    <button style="color: red">
      {{ i }}
    </button>
  </n-popselect>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: '123',
          value: '123'
        }
      ]
    }
  }
})
</script>
