<markdown>
# 控制遮罩的显示

或许有时候你并不想要遮罩。
</markdown>

<template>
  <n-button @click="showModal = true">
    无遮罩
  </n-button>

  <n-modal v-model:show="showModal" :show-mask="false">
    <n-card
      style="width: 600px"
      title="无遮罩"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      看！果然没有遮罩。
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>
