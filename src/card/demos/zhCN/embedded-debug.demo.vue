<markdown>
# embedded debug
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      showModal: ref(false)
    }
  }
})
</script>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <n-card title="卡片" embedded>
      卡片内容
    </n-card>
  </n-modal>
</template>
