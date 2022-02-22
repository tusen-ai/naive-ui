<markdown>
# Dark Debug 4
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
    <n-popover trigger="click">
      <template #trigger>
        <n-button style="margin: 0">
          悬浮
        </n-button>
      </template>
      <span>或许不想知道你的花园长得咋样</span>
    </n-popover>
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
