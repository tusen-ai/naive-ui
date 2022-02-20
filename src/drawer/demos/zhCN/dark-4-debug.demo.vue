<markdown>
# Dark Debug 4
</markdown>

<template>
  <n-button @click="modalActive = !modalActive">
    Toggle
  </n-button>
  <n-drawer v-model:show="modalActive" width="800">
    <n-popover trigger="click">
      <template #activator>
        <n-button style="margin: 0">
          悬浮
        </n-button>
      </template>
      <span>或许不想知道你的花园长得咋样</span>
    </n-popover>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      modalActive: false
    }
  }
})
</script>
