<markdown>
# Nested debug
</markdown>

<template>
  <n-button @click="show1 = !show1">
    show1
  </n-button>
  <n-modal v-model:show="show1" preset="card" style="width: 600px">
    <n-button @click="show2 = !show2">
      show1
    </n-button>
    <n-modal v-model:show="show2" preset="card" style="width: 600px">
      <n-select :options="[{ value: '1', label: '1' }]" />
    </n-modal>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show1: ref(false),
      show2: ref(false)
    }
  }
})
</script>
