<markdown>
# Raw Debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal v-model:show="showModal">
    <div class="box1">
      <input>
      <div class="box2">
        123
      </div>
    </div>
  </n-modal>
</template>
