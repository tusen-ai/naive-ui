<markdown>
# Dark Debug 5
</markdown>

<template>
  <n-button @click="showModal = !showModal">
    Toggle
  </n-button>
  <n-modal
    v-model:show="showModal"
    title="Dark Modal Debug"
    preset="card"
    :style="{ marginTop: '24px', marginBottom: '24px', width: '800px' }"
  >
    <n-calendar />
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      showModal: false
    }
  }
})
</script>
