<markdown>
# Raw Debug
</markdown>

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
